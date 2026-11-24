"""Merge Tripo textures: original for the front of the head (clean face),
fixed for everything else (hair on the back of the head)."""
import bpy, sys, json
import numpy as np

args = sys.argv[sys.argv.index("--") + 1:]
FBX, ORIG, FIXED, OUT = args[:4]

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=FBX)
obj = next(o for o in bpy.context.scene.objects if o.type == "MESH")
me = obj.data
me.calc_loop_triangles()
mw = obj.matrix_world
uv = me.uv_layers.active.data

def load(path):
    im = bpy.data.images.load(path)
    w, h = im.size
    p = np.empty(w * h * 4, np.float32)
    im.pixels.foreach_get(p)
    return p.reshape(h, w, 4), w, h

orig, W, H = load(ORIG)
fixed, _, _ = load(FIXED)

co = [mw @ v.co for v in me.vertices]
zs = [c.z for c in co]
zmin, zmax = min(zs), max(zs)
hgt = zmax - zmin
# the face only: forward-facing, chin to hairline, inside the face's width.
# Sides and back of the head keep the fixed texture (hair).
FACE_Z = (zmin + 0.62 * hgt, zmin + 0.86 * hgt)
head_xs = [c.x for c in co if c.z > zmin + 0.66 * hgt]
head_cx = (min(head_xs) + max(head_xs)) / 2
FACE_HALF_W = 0.62 * (max(head_xs) - min(head_xs)) / 2
HAIRLINE_SIDE = float(args[4]) if len(args) > 4 else 0.77  # ear-top height, fraction of body
CHEEK_NY = float(args[5]) if len(args) > 5 else -0.1  # how far round the side the skin goes

mask = np.zeros((H, W), bool)
n_front = 0
for tri in me.loop_triangles:
    n = (mw.to_3x3() @ tri.normal).normalized()
    cz = sum(co[i].z for i in tri.vertices) / 3
    cx = sum(co[i].x for i in tri.vertices) / 3
    face = FACE_Z[0] < cz < FACE_Z[1] and n.y < -0.3 and abs(cx - head_cx) < FACE_HALF_W
    # cheeks, jaw and ears up to the hairline at the side (ear-top height)
    cheeks = FACE_Z[0] < cz < zmin + HAIRLINE_SIDE * hgt and n.y < CHEEK_NY
    if not (face or cheeks):
        continue
    n_front += 1
    pts = np.array([uv[l].uv[:] for l in tri.loops]) * [W, H]
    x0, y0 = np.floor(pts.min(0)).astype(int) - 2
    x1, y1 = np.ceil(pts.max(0)).astype(int) + 2
    x0, y0 = max(x0, 0), max(y0, 0)
    x1, y1 = min(x1, W - 1), min(y1, H - 1)
    if x1 < x0 or y1 < y0:
        continue
    ys, xs = np.mgrid[y0:y1 + 1, x0:x1 + 1] + 0.5
    (ax, ay), (bx, by), (cx, cy) = pts
    def edge(px, py, qx, qy):
        return (qx - px) * (ys - py) - (qy - py) * (xs - px)
    e0, e1, e2 = edge(ax, ay, bx, by), edge(bx, by, cx, cy), edge(cx, cy, ax, ay)
    inside = ((e0 >= -1.5) & (e1 >= -1.5) & (e2 >= -1.5)) | ((e0 <= 1.5) & (e1 <= 1.5) & (e2 <= 1.5))
    mask[y0:y1 + 1, x0:x1 + 1] |= inside

# grow 3px so island padding takes the same source
m = mask.copy()
for _ in range(3):
    g = m.copy()
    g[1:] |= m[:-1]; g[:-1] |= m[1:]; g[:, 1:] |= m[:, :-1]; g[:, :-1] |= m[:, 1:]
    m = g

out = np.where(m[..., None], orig, fixed)
out[..., 3] = 1
img = bpy.data.images.new("merged", W, H)
img.pixels.foreach_set(out.ravel())
img.filepath_raw = OUT
img.file_format = "PNG"
img.save()
print("RESULT_JSON" + json.dumps({"front_tris": n_front, "mask_pct": float(m.mean() * 100)}))
