from PIL import Image, ImageSequence, ImageDraw
import numpy as np

# Load original image
img_path = "jackalope.png"  # your PNG in the same folder
original = Image.open(img_path).convert("RGBA")

frames = []
num_frames = 24  # frames per loop (24fps = 1s cycle)

for i in range(num_frames):
    frame = Image.new("RGBA", original.size, (0, 0, 0, 0))
    
    offset_y = int(5 * np.sin(2 * np.pi * i / num_frames))
    
    temp = original.copy().transform(
        original.size,
        Image.AFFINE,
        (1, 0.02*np.sin(2*np.pi*i/num_frames), 0,
         0.02*np.cos(2*np.pi*i/num_frames), 1, offset_y),
        resample=Image.BICUBIC
    )
    
    frame.paste(temp, (0,0), temp)
    frames.append(frame)

# Optional: shrink frames to half size to reduce file size
frames = [f.resize((original.width//2, original.height//2), resample=Image.BICUBIC) for f in frames]

# Save GIF
frames[0].save(
    "jackalope_running.gif",
    save_all=True,
    append_images=frames[1:],
    duration=int(1000/24),  # integer ms per frame
    loop=0,
    disposal=2
)
