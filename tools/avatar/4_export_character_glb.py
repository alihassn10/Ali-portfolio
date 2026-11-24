import bpy, sys, math, json
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:]
FBX, TEX, OUT, GLB = args[0], args[1], args[2], (args[3] if len(args) > 3 else None)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=FBX)
obj = next(o for o in bpy.context.scene.objects if o.type == "MESH")

# swap the base colour texture for the fixed one
mat = obj.data.materials[0]
nt = mat.node_tree
tex = next(n for n in nt.nodes if n.type == "TEX_IMAGE")
tex.image = bpy.data.images.load(TEX)
bsdf = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
info = {"links_to_bsdf": [l.to_socket.name for l in nt.links if l.to_node == bsdf],
        "roughness": bsdf.inputs["Roughness"].default_value,
        "metallic": bsdf.inputs["Metallic"].default_value}
bsdf.inputs["Metallic"].default_value = 0.0
bsdf.inputs["Roughness"].default_value = 0.7

bpy.context.view_layer.objects.active = obj
obj.select_set(True)
bpy.ops.object.shade_smooth()
bb = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
mn = Vector((min(v.x for v in bb), min(v.y for v in bb), min(v.z for v in bb)))
mx = Vector((max(v.x for v in bb), max(v.y for v in bb), max(v.z for v in bb)))
info["bbox"] = [list(mn), list(mx)]
c = (mn + mx) / 2

sc = bpy.context.scene
sc.render.engine = "BLENDER_WORKBENCH"
sc.display.shading.color_type = "TEXTURE"
sc.display.shading.light = "STUDIO"
sc.render.film_transparent = True
sc.render.resolution_x = 500
sc.render.resolution_y = 700
cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
sc.collection.objects.link(cam)
sc.camera = cam
cam.data.lens = 70
h = mx.z - mn.z
for ang in (0, 40, 90, 180):
    a = math.radians(ang)
    d = h * 3.4
    cam.location = c + Vector((math.sin(a) * d, -math.cos(a) * d, 0))
    cam.rotation_euler = (c - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = f"{OUT}/tripo_{ang}.png"
    bpy.ops.render.render(write_still=True)

if GLB:
    bpy.ops.export_scene.gltf(filepath=GLB, export_format="GLB", use_selection=True,
                              export_image_format="JPEG", export_image_quality=90,
                              export_yup=True, export_cameras=False, export_lights=False)
print("RESULT_JSON" + json.dumps(info, default=list))
