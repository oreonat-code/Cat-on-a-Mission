# Cat world artwork

Generated with the built-in imagegen tool from the two user-supplied visual references. WebP encoding preserves transparent character backgrounds. UI is rendered separately in React.

## room.webp

Saved asset: `client/src/assets/cat-world/room.webp`

Prompt:

Use case: illustration-story. Asset type: decorative background for a children's learning web app, landscape 3:2. Reference: attached cat learning room images, style and atmosphere only. Create the same warm, softly painted storybook cat room, sunlit wooden window at far left, clouds and green garden outside, sleeping calico on a small scratching post at far left, hanging green plants and shelves on far right, a tiny cat wardrobe at far right, warm cream walls, wooden floor and oval pale fluffy rug at bottom. VERY IMPORTANT leave the central 70 percent completely empty cream wall and floor with no furniture or characters, to overlay real accessible UI. Warm pastel ochre, sand, cream, navy details. No text, letters, numbers, logos, icons, UI, panels or buttons. Cozy dimensional illustration with soft edges and subtle paper texture. Return a landscape background.

## math-cat.webp

Saved asset: `client/src/assets/cat-world/math-cat.webp`

Prompt:

Use case: illustration-story. Asset type: transparent cutout illustration for a children's maths adventure card. Reference attached learning adventure design, style only. One happy orange and white kitten, sitting upright, holding a little dark navy chalkboard with only the equation 1 + 2 in cream. A few floating addition and subtraction symbols in cobalt and mint around kitten. Soft painted storybook style, warm dimensional pastel shading and paper grain. Entire subject visible with generous clear margins. No background, no card, no other text, no watermark. Transparent background.

## english-cat.webp

Saved asset: `client/src/assets/cat-world/english-cat.webp`

Prompt:

Use case: illustration-story. Asset type: transparent cutout illustration for a children's English adventure card. Reference attached learning adventure design, style only. One adorable slate-blue kitten happily reading an open coral-orange book with blank pages, looking at viewer. Three playful floating letters A B C around the kitten in cobalt, ochre and mint. Soft painted storybook style, warm dimensional pastel shading, paper grain. Entire subject visible with generous clear margins. No background, no card, no other text, no watermark. Transparent background.

## sleeping-cats.webp

Saved asset: `client/src/assets/cat-world/sleeping-cats.webp`

Prompt:

Use case: illustration-story. Asset type: wide question illustration for early learning web app. Reference attached Which word fits question picture, style and content only. Three adorable cats sleeping side by side on a fluffy cream rug: orange and white calico at left, cream siamese with brown ears in middle, slate-blue cat at right. Closed eyes, curled tails and paws, sleepy peaceful expressions, small cobalt zzz marks. Pale sage wall behind them, very simple. Softly painted dimensional storybook illustration with subtle paper grain. Wide landscape crop 3:1 composition. No interface, no text except small sleep z marks, no frame, no watermark.


# Remaining question artwork

Generated with the built-in imagegen tool using `sleeping-cats.webp` as the style reference. Single-animal transparent WebP assets are repeated in React so counts remain exact.

## sitting-cat.webp

Saved asset: `client/src/assets/cat-world/sitting-cat.webp`

Prompt:

Use case: illustration-story. Asset type: transparent educational counting illustration for the existing CTY cat learning room. Input image is a style reference only. Create ONE complete orange-and-white calico kitten sitting upright with all four paws, head, ears and curled tail clearly visible, awake smiling navy eyes and tiny navy mouth. Exactly one kitten, no other creatures or props. Match the reference's warm softly painted dimensional storybook style, cream fur, orange patches, subtle paper texture and soft edges. Three quarter front view, generous clear transparent margins, no ground shadow or surrounding scene. No text, numbers, symbols, logos or red. Transparent background.

## sofa-cat.webp

Saved asset: `client/src/assets/cat-world/sofa-cat.webp`

Prompt:

Use case: illustration-story. Asset type: wide 3:1 educational scene for the sentence The cat sleeps on the sofa. Input image is a style reference only. EXACTLY ONE orange-and-white calico kitten sleeping curled up ON a cosy cobalt-blue sofa with rounded arms and short wooden legs. Pale sage wall, warm softly painted dimensional storybook look and gentle sunlight; subtle paper texture. Sofa and sleeping cat entirely visible in the central two thirds, camera straight on. Small cream fluffy rug below sofa. No extra animals, no other furniture, no book, no fish, no text, logos, letters or red. Wide landscape composition, consistent with the reference illustration.

Maths fish reuse the existing token-based SVG `Fish` component in `components/art/Art.jsx`.


## High-resolution scene delivery (2026-10-16)

The app now loads the four `*-2x.webp` scene files. The original PNGs remain as
source artwork. Only import paths change; scene aspect ratios, layout and
percentage-based click targets stay the same.

| Source PNG | Delivered WebP | Dimensions |
| --- | --- | --- |
| `home-empty-perch.png` | `home-empty-perch-2x.webp` | 3344 × 1882 |
| `shop-reference.png` | `shop-reference-2x.webp` | 2968 × 2120 |
| `wardrobe-empty-preview.png` | `wardrobe-empty-preview-2x.webp` | 2968 × 2120 |
| `badges-reference.png` | `badges-reference-2x.webp` | 2968 × 2120 |

These are local AI super-resolution results, not new generated compositions.
Tool: [Real-ESRGAN portable macOS release 20220424](https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0),
model `realesr-animevideov3` at native scale 2. No image-generation prompt is used.
The built-in image-generation trial returned the original dimensions and was not
used in the app.

Run from the portable tool directory for each source:

```sh
./realesrgan-ncnn-vulkan -i SOURCE.png -o UPSCALED.png \
  -n realesr-animevideov3 -s 2 -t 128 -j 1:1:1
```

Encode the upscaled RGB PNG as WebP with Pillow using `quality=96, method=6`.
This delivery encoding reduces the four scenes to approximately 2.6 MB combined;
the original PNG sources total approximately 7.2 MB. Keep the exact 2× dimensions.
Verify the original text, empty perch, scene boundaries and click-target alignment
before replacing an asset. AI upscaling improves edges but does not make baked-in
text equivalent to native HTML text at every zoom level.
