"""Project the front photo onto the decimated avatar, fill unseen areas, bake to one texture."""
import bpy, sys, json, math
import numpy as np
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:]
PHOTO, OUT_DIR = args[0], args[1]
TEX_SIZE = 2048

# ---- alignment (measured from the ortho front render vs the photo) ----
ORTHO = 1.05          # ortho scale of the reference render (1000x1000 px)
R_ANCHOR = (497, 245)  # glasses centre in render px
P_ANCHOR = (810, 640)  # glasses centre in photo px
SY = 1.97
def sx_of(yr):        # head is 1.97x, shoulders 1.80x
    t = np.clip((yr - 450) / 110.0, 0, 1)
    return 1.97 + (1.80 - 1.97) * t

def world_to_render(x, z):
    return (x / ORTHO + 0.5) * 1000.0, (0.5 - z / ORTHO) * 1000.0

# ---- photo: load, clean background using a hand-traced silhouette ----
photo = bpy.data.images.load(PHOTO)
W, H = photo.size
px = np.empty(W * H * 4, dtype=np.float32)
photo.pixels.foreach_get(px)
img = px.reshape(H, W, 4)[::-1].copy()  # row 0 = top of photo

def patch(x0, y0, x1, y1):
    return img[y0:y1, x0:x1, :3].reshape(-1, 3).mean(0)

HAIR = np.array([0.075, 0.062, 0.058], np.float32)  # photo hair has sky glints; use clean near-black
FACE_SKIN = patch(610, 720, 660, 780)  # cheek under the glasses
SKIN = patch(780, 1060, 860, 1110)     # neck (shadowed)
SHIRT = patch(950, 1550, 1150, 1700)

# person silhouette in photo px (clockwise from top of hair)
poly = np.array([
    (640, 280), (800, 238), (950, 262), (1050, 320), (1095, 420), (1092, 560),
    (1082, 640), (1086, 760), (1050, 810), (1010, 930), (930, 1010), (820, 1035),
    (720, 1010), (650, 940), (600, 810), (565, 780), (550, 650), (530, 520), (545, 390),
    # neck -> collar -> left shoulder handled below, close around body
], dtype=np.float32)
body = np.array([
    (630, 1000), (1010, 1000), (1060, 1080), (1130, 1140), (1400, 1250), (1555, 1340),
    (1595, 1500), (1615, 1800), (1637, 2000), (0, 2000), (25, 1800), (55, 1500),
    (110, 1330), (250, 1260), (520, 1150), (590, 1080),
], dtype=np.float32)

def inside(poly, xs, ys):
    res = np.zeros(xs.shape, dtype=bool)
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        cond = ((y1 > ys) != (y2 > ys))
        xint = (x2 - x1) * (ys - y1) / (y2 - y1 + 1e-9) + x1
        res ^= cond & (xs < xint)
    return res

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
person = inside(poly, xx, yy) | inside(body, xx, yy)
near_head = (np.abs(xx - 815) < 300)[..., None]
fill_rows = np.where(yy[..., None] < 640, HAIR,
                     np.where((yy[..., None] < 1000) & near_head, FACE_SKIN, SHIRT))
clean = np.where(person[..., None], img[..., :3], fill_rows)
out = np.concatenate([clean, np.ones((H, W, 1), np.float32)], axis=2)[::-1]
cimg = bpy.data.images.new("photo_clean", W, H)
cimg.pixels.foreach_set(out.ravel())
cimg.filepath_raw = f"{OUT_DIR}/photo_clean.png"
cimg.file_format = "PNG"
cimg.save()

# ---- mesh: projection UVs + fill colours for unseen areas ----
obj = bpy.data.objects["Avatar"]
me = obj.data
mw = obj.matrix_world
co = np.array([tuple(mw @ v.co) for v in me.vertices], dtype=np.float32)
nrm = np.array([tuple((mw.to_3x3() @ v.normal).normalized()) for v in me.vertices], dtype=np.float32)

xr, yr = world_to_render(co[:, 0], co[:, 2])
Xp = P_ANCHOR[0] + sx_of(yr) * (xr - R_ANCHOR[0])
Yp = P_ANCHOR[1] + SY * (yr - R_ANCHOR[1])
u = Xp / W
v = 1.0 - Yp / H

if "proj" not in me.uv_layers:
    me.uv_layers.new(name="proj")
proj = me.uv_layers["proj"]
loop_v = np.empty(len(me.loops), dtype=np.int32)
me.loops.foreach_get("vertex_index", loop_v)
proj.data.foreach_set("uv", np.stack([u[loop_v], v[loop_v]], 1).ravel())
me.uv_layers.active = me.uv_layers["UVMap"]

# fill colour per vertex for sides/back (camera looks along +Y, so front normal is -Y)
dx = np.abs(xr - R_ANCHOR[0])
head = (yr < 470) & (dx < 200)
fill = np.tile(SHIRT, (len(co), 1))
fill[head] = HAIR
side_face = head & (yr > 235) & (np.abs(nrm[:, 0]) > np.abs(nrm[:, 1]))
fill[side_face] = FACE_SKIN
fill[head & (yr > 395)] = SHIRT                      # back of collar
fill[(yr > 395) & (yr < 450) & (dx < 85)] = SKIN     # neck only
fill[(yr > 800) & (dx > 370)] = FACE_SKIN            # forearms below sleeves
fill = np.where(fill <= 0.04045, fill / 12.92, ((fill + 0.055) / 1.055) ** 2.4)  # sRGB -> linear
facing = np.clip(-nrm[:, 1], 0, 1)
w_front = np.clip((facing - 0.2) / 0.35, 0, 1)
w_front = w_front * w_front * (3 - 2 * w_front)

attr = me.color_attributes.get("fill") or me.color_attributes.new("fill", "FLOAT_COLOR", "POINT")
attr.data.foreach_set("color", np.concatenate([fill, w_front[:, None]], 1).astype(np.float32).ravel())

# ---- bake material: emission = mix(fill, photo(proj), front weight) ----
bake_img = bpy.data.images.new("avatar_albedo", TEX_SIZE, TEX_SIZE)
mat = bpy.data.materials.new("BakeMat")
mat.use_nodes = True
nt = mat.node_tree
nt.nodes.clear()
outn = nt.nodes.new("ShaderNodeOutputMaterial")
emi = nt.nodes.new("ShaderNodeEmission")
uvn = nt.nodes.new("ShaderNodeUVMap"); uvn.uv_map = "proj"
tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = cimg; tex.extension = "EXTEND"
attrn = nt.nodes.new("ShaderNodeAttribute"); attrn.attribute_name = "fill"
mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"
target = nt.nodes.new("ShaderNodeTexImage"); target.image = bake_img
nt.links.new(uvn.outputs["UV"], tex.inputs["Vector"])
nt.links.new(attrn.outputs["Alpha"], mix.inputs["Factor"])
nt.links.new(attrn.outputs["Color"], mix.inputs[6])   # A
nt.links.new(tex.outputs["Color"], mix.inputs[7])     # B
nt.links.new(mix.outputs[2], emi.inputs["Color"])
nt.links.new(emi.outputs["Emission"], outn.inputs["Surface"])
nt.nodes.active = target
me.materials.clear()
me.materials.append(mat)

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 1
scene.render.bake.margin = 8
bpy.ops.object.select_all(action="DESELECT")
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
bpy.ops.object.bake(type="EMIT")

bake_img.filepath_raw = f"{OUT_DIR}/avatar_albedo.png"
bake_img.file_format = "PNG"
bake_img.save()

# ---- final material for preview/export ----
fmat = bpy.data.materials.new("AvatarMat")
fmat.use_nodes = True
fnt = fmat.node_tree
bsdf = fnt.nodes["Principled BSDF"]
ft = fnt.nodes.new("ShaderNodeTexImage"); ft.image = bake_img
fnt.links.new(ft.outputs["Color"], bsdf.inputs["Base Color"])
bsdf.inputs["Roughness"].default_value = 0.55
me.materials.clear()
me.materials.append(fmat)
me.uv_layers.remove(me.uv_layers["proj"])
me.color_attributes.remove(me.color_attributes["fill"])

# ---- previews ----
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.color_type = "TEXTURE"
scene.display.shading.light = "FLAT"
cam = scene.camera
cam.data.type = "PERSP"
cam.data.lens = 60
scene.render.resolution_x = 700
scene.render.resolution_y = 800
cy = (min(c[1] for c in co) + max(c[1] for c in co)) / 2
target_pt = Vector((0, cy, 0.05))
for ang in (0, 35, 75, 180):
    a = math.radians(ang)
    cam.location = target_pt + Vector((math.sin(a) * 3.2, -math.cos(a) * 3.2, 0.05))
    cam.rotation_euler = (target_pt - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = f"{OUT_DIR}/proj_{ang}.png"
    bpy.ops.render.render(write_still=True)

bpy.ops.wm.save_as_mainfile(filepath=f"{OUT_DIR}/avatar_textured.blend")
print("RESULT_JSON" + json.dumps({"hair": HAIR.tolist(), "skin": SKIN.tolist(), "shirt": SHIRT.tolist()}))
