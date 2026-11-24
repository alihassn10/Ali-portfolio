import bpy, bmesh, json, math, sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:]
OBJ, TEX, OUT_DIR = args[0], args[1], args[2]
TARGET_TRIS = 40000

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=OBJ)
meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]

# join the 3 chunks into one mesh
bpy.ops.object.select_all(action="DESELECT")
for o in meshes:
    o.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
bpy.ops.object.join()
obj = bpy.context.view_layer.objects.active
obj.name = "Avatar"
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

def tri_count(o):
    o.data.calc_loop_triangles()
    return len(o.data.loop_triangles)

before = {"verts": len(obj.data.vertices), "tris": tri_count(obj)}

# weld the seams left by the 65k-vertex split
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.mesh.remove_doubles(threshold=0.0001)
bpy.ops.object.mode_set(mode="OBJECT")

# decimate
ratio = min(1.0, TARGET_TRIS / tri_count(obj))
mod = obj.modifiers.new("Decimate", "DECIMATE")
mod.ratio = ratio
mod.use_collapse_triangulate = True
bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.shade_smooth()

after = {"verts": len(obj.data.vertices), "tris": tri_count(obj)}

# centre on origin, normalise height to 1
bb = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
mn = Vector((min(v.x for v in bb), min(v.y for v in bb), min(v.z for v in bb)))
mx = Vector((max(v.x for v in bb), max(v.y for v in bb), max(v.z for v in bb)))
size = mx - mn
obj.location -= (mn + mx) / 2
obj.scale *= 1.0 / size.z
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# generate new UVs (the source has none)
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.003)
bpy.ops.object.mode_set(mode="OBJECT")

# material with the provided texture
mat = bpy.data.materials.new("AvatarMat")
mat.use_nodes = True
nt = mat.node_tree
bsdf = nt.nodes["Principled BSDF"]
img = nt.nodes.new("ShaderNodeTexImage")
img.image = bpy.data.images.load(TEX)
nt.links.new(img.outputs["Color"], bsdf.inputs["Base Color"])
bsdf.inputs["Roughness"].default_value = 0.6
obj.data.materials.clear()
obj.data.materials.append(mat)

# preview renders (workbench, texture colour)
scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.color_type = "TEXTURE"
scene.display.shading.light = "STUDIO"
scene.render.resolution_x = 700
scene.render.resolution_y = 800
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 60
cam = bpy.data.objects.new("Cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam

def shoot(name, angle_deg):
    a = math.radians(angle_deg)
    d = 3.2
    cam.location = (math.sin(a) * d, -math.cos(a) * d, 0.0)
    direction = Vector((0, 0, 0)) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = f"{OUT_DIR}/{name}.png"
    bpy.ops.render.render(write_still=True)

for ang in (0, 35, 180):
    shoot(f"preview_{ang}", ang)

bpy.ops.wm.save_as_mainfile(filepath=f"{OUT_DIR}/avatar.blend")
print("RESULT_JSON" + json.dumps({"before": before, "after": after, "ratio": round(ratio, 3),
                                  "dims_before": [round(v, 4) for v in size]}))
