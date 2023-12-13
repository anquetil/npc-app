import { buildSVG } from '../utils/svgBuilder'
import { PartType } from '@/types/PartType'
import ImageData from './image-data.json'
const { bodies, accessories, heads, glasses } = ImageData.images

export function dataTo64SVG(data: string) {
   return `data:image/svg+xml;base64,${btoa(
      buildSVG([{ data }], ImageData.palette /*, "ccaa55" OPTIONAL BG */)
   )}`
}

export function getBackgroundSVG(partIndex: number) {
   const bgColor = ImageData.bgcolors[partIndex]
   const svg = `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#${bgColor}" /></svg>`
   const image = `data:image/svg+xml;base64,${btoa(svg)}`
   return image
}

/*images.bodies.map(b => console.log(`[\"${b.filename}\",\"${formatFileNameTemp(b.filename)}\"],`))
images.accessories.map(b => console.log(`[\"${b.filename}\",\"${formatFileNameTemp(b.filename)}\"],`))
images.heads.map(b => console.log(`[\"${b.filename}\",\"${formatFileNameTemp(b.filename)}\"],`))
images.glasses.map(b => console.log(`[\"${b.filename}\",\"${formatFileNameTemp(b.filename)}\"],`))
console.log('bg-cool')
console.log('bg-warm')*/

function formatFileNameTemp(s: string) {
   const temp = s.split('-').slice(1)
   let res = ''
   for (const sub of temp) {
      res += ' ' + sub[0].toUpperCase() + sub.substring(1)
   }
   return res.substring(1)
}

export const filenameToHumanReadable = new Map([
   ['bg-cool', 'Cool'],
   ['bg-warm', 'Warm'],
   ['body-bege-bsod', 'Beige BSOD'],
   ['body-bege-crt', 'Beige CRT'],
   ['body-blue-sky', 'Blue Sky'],
   ['body-bluegrey', 'Blue Grey'],
   ['body-cold', 'Cold'],
   ['body-computerblue', 'Computer Blue'],
   ['body-darkbrown', 'Dark Brown'],
   ['body-darkpink', 'Dark Pink'],
   ['body-foggrey', 'Fog Grey'],
   ['body-gold', 'Gold'],
   ['body-grayscale-1', 'Grayscale 1'],
   ['body-grayscale-7', 'Grayscale 7'],
   ['body-grayscale-8', 'Grayscale 8'],
   ['body-grayscale-9', 'Grayscale 9'],
   ['body-green', 'Green'],
   ['body-gunk', 'Gunk'],
   ['body-hotbrown', 'Hot Brown'],
   ['body-magenta', 'Magenta'],
   ['body-orange-yellow', 'Orange Yellow'],
   ['body-orange', 'Orange'],
   ['body-peachy-B', 'Peachy B'],
   ['body-peachy-a', 'Peachy A'],
   ['body-purple', 'Purple'],
   ['body-red', 'Red'],
   ['body-redpinkish', 'Red Pinkish'],
   ['body-rust', 'Rust'],
   ['body-slimegreen', 'Slime Green'],
   ['body-teal-light', 'Teal Light'],
   ['body-teal', 'Teal'],
   ['body-yellow', 'Yellow'],
   ['accessory-1n', '1n'],
   ['accessory-aardvark', 'Aardvark'],
   ['accessory-axe', 'Axe'],
   ['accessory-belly-chameleon', 'Belly Chameleon'],
   ['accessory-bird-flying', 'Bird Flying'],
   ['accessory-bird-side', 'Bird Side'],
   ['accessory-bling-anchor', 'Bling Anchor'],
   ['accessory-bling-anvil', 'Bling Anvil'],
   ['accessory-bling-arrow', 'Bling Arrow'],
   ['accessory-bling-cheese', 'Bling Cheese'],
   ['accessory-bling-gold-ingot', 'Bling Gold Ingot'],
   ['accessory-bling-love', 'Bling Love'],
   ['accessory-bling-mask', 'Bling Mask'],
   ['accessory-bling-rings', 'Bling Rings'],
   ['accessory-bling-scissors', 'Bling Scissors'],
   ['accessory-bling-sparkles', 'Bling Sparkles'],
   ['accessory-body-gradient-checkerdisco', 'Gradient Checker Disco'],
   ['accessory-body-gradient-dawn', 'Gradient Dawn'],
   ['accessory-body-gradient-dusk', 'Gradient Dusk'],
   ['accessory-body-gradient-glacier', 'Gradient Glacier'],
   ['accessory-body-gradient-ice', 'Gradient Ice'],
   ['accessory-body-gradient-pride', 'Gradient Pride'],
   ['accessory-body-gradient-redpink', 'Gradient Redpink'],
   ['accessory-body-gradient-sunset', 'Gradient Sunset'],
   ['accessory-carrot', 'Carrot'],
   ['accessory-chain-logo', 'Chain Logo'],
   ['accessory-checker-RGB', 'Checker RGB'],
   ['accessory-checker-bigwalk-blue-prime', 'Bigwalk Blue Prime'],
   ['accessory-checker-bigwalk-greylight', 'Bigwalk Greylight'],
   ['accessory-checker-bigwalk-rainbow', 'Bigwalk Rainbow'],
   ['accessory-checker-spaced-black', 'Checker Spaced Black'],
   ['accessory-checker-spaced-white', 'Checker Spaced White'],
   ['accessory-checker-vibrant', 'Checker Vibrant'],
   ['accessory-checkers-big-green', 'Checkers Big Green'],
   ['accessory-checkers-big-red-cold', 'Checkers Big Red Cold'],
   ['accessory-checkers-black', 'Checkers Black'],
   ['accessory-checkers-blue', 'Checkers Blue'],
   ['accessory-checkers-magenta-80', 'Checkers Magenta 80'],
   ['accessory-chicken', 'Chicken'],
   ['accessory-cloud', 'Cloud'],
   ['accessory-clover', 'Clover'],
   ['accessory-collar-sunset', 'Collar Sunset'],
   ['accessory-cow', 'Cow'],
   ['accessory-decay-gray-dark', 'Decay Gray Dark'],
   ['accessory-decay-pride', 'Decay Pride'],
   ['accessory-dinosaur', 'Dinosaur'],
   ['accessory-dollar-bling', 'Dollar Bling'],
   ['accessory-dragon', 'Dragon'],
   ['accessory-ducky', 'Ducky'],
   ['accessory-eth', 'Eth'],
   ['accessory-eye', 'Eye'],
   ['accessory-flash', 'Flash'],
   ['accessory-fries', 'Fries'],
   ['accessory-glasses-logo-sun', 'Logo Sun'],
   ['accessory-glasses-logo', 'Logo'],
   ['accessory-glasses', 'Glasses'],
   ['accessory-grid-simple-bege', 'Grid Simple Bege'],
   ['accessory-heart', 'Heart'],
   ['accessory-hoodiestrings-uneven', 'Hoodiestrings Uneven'],
   ['accessory-id', 'Id'],
   ['accessory-infinity', 'Infinity'],
   ['accessory-insignia', 'Insignia'],
   ['accessory-leaf', 'Leaf'],
   ['accessory-lightbulb', 'Lightbulb'],
   ['accessory-lines-45-greens', 'Lines 45 Greens'],
   ['accessory-lines-45-rose', 'Lines 45 Rose'],
   ['accessory-lp', 'Lp'],
   ['accessory-marsface', 'Marsface'],
   ['accessory-matrix-white', 'Matrix White'],
   ['accessory-moon-block', 'Moon Block'],
   ['accessory-none', 'None'],
   ['accessory-oldshirt', 'Oldshirt'],
   ['accessory-pizza-bling', 'Pizza Bling'],
   ['accessory-pocket-pencil', 'Pocket Pencil'],
   ['accessory-rain', 'Rain'],
   ['accessory-rainbow-steps', 'Rainbow Steps'],
   ['accessory-rgb', 'RGB'],
   ['accessory-robot', 'Robot'],
   ['accessory-safety-vest', 'Safety Vest'],
   ['accessory-scarf-clown', 'Scarf Clown'],
   ['accessory-secret-x', 'Secret X'],
   ['accessory-shirt-black', 'Shirt Black'],
   ['accessory-shrimp', 'Shrimp'],
   ['accessory-slimesplat', 'Slimesplat'],
   ['accessory-small-bling', 'Small Bling'],
   ['accessory-snowflake', 'Snowflake'],
   ['accessory-stains-blood', 'Stains Blood'],
   ['accessory-stains-zombie', 'Stains Zombie'],
   ['accessory-stripes-and-checks', 'Stripes And Checks'],
   ['accessory-stripes-big-red', 'Stripes Big Red'],
   ['accessory-stripes-blit', 'Stripes Blit'],
   ['accessory-stripes-blue-med', 'Stripes Blue Med'],
   ['accessory-stripes-brown', 'Stripes Brown'],
   ['accessory-stripes-olive', 'Stripes Olive'],
   ['accessory-stripes-red-cold', 'Stripes Red Cold'],
   ['accessory-sunset', 'Sunset'],
   ['accessory-taxi-checkers', 'Taxi Checkers'],
   ['accessory-tee-yo', 'Tee Yo'],
   ['accessory-text-yolo', 'Text Yolo'],
   ['accessory-think', 'Think'],
   ['accessory-tie-black-on-white', 'Tie Black On White'],
   ['accessory-tie-dye', 'Tie Dye'],
   ['accessory-tie-purple-on-white', 'Tie Purple On White'],
   ['accessory-tie-red', 'Tie Red'],
   ['accessory-txt-a2+b2', 'Text A2+b2'],
   ['accessory-txt-cc', 'Text Cc'],
   ['accessory-txt-cc2', 'Text Cc2'],
   ['accessory-txt-copy', 'Text Copy'],
   ['accessory-txt-dao-black', 'Text Dao Black'],
   ['accessory-txt-doom', 'Text Doom'],
   ['accessory-txt-dope-text', 'Text Dope Text'],
   ['accessory-txt-foo-black', 'Text Foo Black'],
   ['accessory-txt-ico', 'Text Ico'],
   ['accessory-txt-io', 'Text Io'],
   ['accessory-txt-lmao', 'Text Lmao'],
   ['accessory-txt-lol', 'Text Lol'],
   ['accessory-txt-mint', 'Text Mint'],
   ['accessory-txt-nil-grey-dark', 'Text Nil Grey Dark'],
   ['accessory-txt-noun-f0f', 'Text Noun F0f'],
   ['accessory-txt-noun-green', 'Text Noun Green'],
   ['accessory-txt-noun-multicolor', 'Text Noun Multicolor'],
   ['accessory-txt-noun', 'Text Noun'],
   ['accessory-txt-pi', 'Text Pi'],
   ['accessory-txt-pop', 'Text Pop'],
   ['accessory-txt-rofl', 'Text Rofl'],
   ['accessory-txt-we', 'Text We'],
   ['accessory-txt-yay', 'Text Yay'],
   ['accessory-wall', 'Wall'],
   ['accessory-wave', 'Wave'],
   ['accessory-wet-money', 'Wet Money'],
   ['accessory-woolweave-bicolor', 'Woolweave Bicolor'],
   ['accessory-woolweave-dirt', 'Woolweave Dirt'],
   ['accessory-yingyang', 'Yingyang'],
   ['body-bege', 'Bege'],
   ['body-gray-scale-1', 'Gray Scale 1'],
   ['body-gray-scale-9', 'Gray Scale 9'],
   ['body-ice-cold', 'Ice Cold'],
   ['accessory-grease', 'Grease'],
   ['accessory-tatewaku', 'Tatewaku'],
   ['accessory-uroko', 'Uroko'],
   ['accessory-broken-heart', 'Broken Heart'],
   ['accessory-sweater', 'Sweater'],
   ['head-aardvark', 'Aardvark'],
   ['head-abstract', 'Abstract'],
   ['head-ape', 'Ape'],
   ['head-bag', 'Bag'],
   ['head-bagpipe', 'Bagpipe'],
   ['head-banana', 'Banana'],
   ['head-bank', 'Bank'],
   ['head-baseball-gameball', 'Baseball Gameball'],
   ['head-basketball', 'Basketball'],
   ['head-bat', 'Bat'],
   ['head-bear', 'Bear'],
   ['head-beer', 'Beer'],
   ['head-beet', 'Beet'],
   ['head-bell', 'Bell'],
   ['head-bigfoot-yeti', 'Bigfoot Yeti'],
   ['head-bigfoot', 'Bigfoot'],
   ['head-blackhole', 'Blackhole'],
   ['head-blueberry', 'Blueberry'],
   ['head-bomb', 'Bomb'],
   ['head-bonsai', 'Bonsai'],
   ['head-boombox', 'Boombox'],
   ['head-boot', 'Boot'],
   ['head-box', 'Box'],
   ['head-boxingglove', 'Boxing Glove'],
   ['head-brain', 'Brain'],
   ['head-bubble-speech', 'Bubble Speech'],
   ['head-bubblegum', 'Bubblegum'],
   ['head-burger-dollarmenu', 'Burger Dollarmenu'],
   ['head-cake', 'Cake'],
   ['head-calculator', 'Calculator'],
   ['head-calendar', 'Calendar'],
   ['head-camcorder', 'Camcorder'],
   ['head-cannedham', 'Cannedham'],
   ['head-car', 'Car'],
   ['head-cash-register', 'Cash Register'],
   ['head-cassettetape', 'Cassette Tape'],
   ['head-cat', 'Cat'],
   ['head-cd', 'Cd'],
   ['head-chain', 'Chain'],
   ['head-chainsaw', 'Chainsaw'],
   ['head-chameleon', 'Chameleon'],
   ['head-chart-bars', 'Chart Bars'],
   ['head-cheese', 'Cheese'],
   ['head-chefhat', 'Chef Hat'],
   ['head-cherry', 'Cherry'],
   ['head-chicken', 'Chicken'],
   ['head-chilli', 'Chilli'],
   ['head-chipboard', 'Chipboard'],
   ['head-chips', 'Chips'],
   ['head-chocolate', 'Chocolate'],
   ['head-cloud', 'Cloud'],
   ['head-clover', 'Clover'],
   ['head-clutch', 'Clutch'],
   ['head-coffeebean', 'Coffeebean'],
   ['head-cone', 'Cone'],
   ['head-console-handheld', 'Console Handheld'],
   ['head-cookie', 'Cookie'],
   ['head-cordlessphone', 'Cordless Phone'],
   ['head-cottonball', 'Cottonball'],
   ['head-cow', 'Cow'],
   ['head-crab', 'Crab'],
   ['head-crane', 'Crane'],
   ['head-croc-hat', 'Croc Hat'],
   ['head-crown', 'Crown'],
   ['head-crt-bsod', 'CRT BSOD'],
   ['head-crystalball', 'Crystal Ball'],
   ['head-diamond-blue', 'Diamond Blue'],
   ['head-diamond-red', 'Diamond Red'],
   ['head-dictionary', 'Dictionary'],
   ['head-dino', 'Dino'],
   ['head-dna', 'Dna'],
   ['head-dog', 'Dog'],
   ['head-doughnut', 'Doughnut'],
   ['head-drill', 'Drill'],
   ['head-duck', 'Duck'],
   ['head-ducky', 'Ducky'],
   ['head-earth', 'Earth'],
   ['head-egg', 'Egg'],
   ['head-faberge', 'Faberge'],
   ['head-factory-dark', 'Factory Dark'],
   ['head-fan', 'Fan'],
   ['head-fence', 'Fence'],
   ['head-film-35mm', 'Film 35mm'],
   ['head-film-strip', 'Film Strip'],
   ['head-fir', 'Fir'],
   ['head-firehydrant', 'Fire Hydrant'],
   ['head-flamingo', 'Flamingo'],
   ['head-flower', 'Flower'],
   ['head-fox', 'Fox'],
   ['head-frog', 'Frog'],
   ['head-garlic', 'Garlic'],
   ['head-gavel', 'Gavel'],
   ['head-ghost-B', 'Ghost B'],
   ['head-glasses-big', 'Glasses Big'],
   ['head-gnome', 'Gnome'],
   ['head-goat', 'Goat'],
   ['head-goldcoin', 'Gold Coin'],
   ['head-goldfish', 'Goldfish'],
   ['head-grouper', 'Grouper'],
   ['head-hair', 'Hair'],
   ['head-hardhat', 'Hardhat'],
   ['head-heart', 'Heart'],
   ['head-helicopter', 'Helicopter'],
   ['head-highheel', 'Highheel'],
   ['head-hockeypuck', 'Hockeypuck'],
   ['head-horse-deepfried', 'Horse Deepfried'],
   ['head-hotdog', 'Hotdog'],
   ['head-house', 'House'],
   ['head-icepop-b', 'Icepop B'],
   ['head-igloo', 'Igloo'],
   ['head-island', 'Island'],
   ['head-jellyfish', 'Jellyfish'],
   ['head-jupiter', 'Jupiter'],
   ['head-kangaroo', 'Kangaroo'],
   ['head-ketchup', 'Ketchup'],
   ['head-laptop', 'Laptop'],
   ['head-lightning-bolt', 'Lightning Bolt'],
   ['head-lint', 'Lint'],
   ['head-lips', 'Lips'],
   ['head-lipstick2', 'Lipstick2'],
   ['head-lock', 'Lock'],
   ['head-macaroni', 'Macaroni'],
   ['head-mailbox', 'Mailbox'],
   ['head-maze', 'Maze'],
   ['head-microwave', 'Microwave'],
   ['head-milk', 'Milk'],
   ['head-mirror', 'Mirror'],
   ['head-mixer', 'Mixer'],
   ['head-moon', 'Moon'],
   ['head-moose', 'Moose'],
   ['head-mosquito', 'Mosquito'],
   ['head-mountain-snowcap', 'Mountain Snowcap'],
   ['head-mouse', 'Mouse'],
   ['head-mug', 'Mug'],
   ['head-mushroom', 'Mushroom'],
   ['head-mustard', 'Mustard'],
   ['head-nigiri', 'Nigiri'],
   ['head-noodles', 'Noodles'],
   ['head-onion', 'Onion'],
   ['head-orangutan', 'Orangutan'],
   ['head-orca', 'Orca'],
   ['head-otter', 'Otter'],
   ['head-outlet', 'Outlet'],
   ['head-owl', 'Owl'],
   ['head-oyster', 'Oyster'],
   ['head-paintbrush', 'Paintbrush'],
   ['head-panda', 'Panda'],
   ['head-paperclip', 'Paperclip'],
   ['head-peanut', 'Peanut'],
   ['head-pencil-tip', 'Pencil Tip'],
   ['head-peyote', 'Peyote'],
   ['head-piano', 'Piano'],
   ['head-pickle', 'Pickle'],
   ['head-pie', 'Pie'],
   ['head-piggybank', 'Piggybank'],
   ['head-pill', 'Pill'],
   ['head-pillow', 'Pillow'],
   ['head-pineapple', 'Pineapple'],
   ['head-pipe', 'Pipe'],
   ['head-pirateship', 'Pirateship'],
   ['head-pizza', 'Pizza'],
   ['head-plane', 'Plane'],
   ['head-pop', 'Pop'],
   ['head-porkbao', 'Porkbao'],
   ['head-potato', 'Potato'],
   ['head-pufferfish', 'Pufferfish'],
   ['head-pumpkin', 'Pumpkin'],
   ['head-pyramid', 'Pyramid'],
   ['head-queencrown', 'Queen Crown'],
   ['head-rabbit', 'Rabbit'],
   ['head-rainbow', 'Rainbow'],
   ['head-rangefinder', 'Rangefinder'],
   ['head-raven', 'Raven'],
   ['head-retainer', 'Retainer'],
   ['head-rgb', 'RGB'],
   ['head-ring', 'Ring'],
   ['head-road', 'Road'],
   ['head-robot', 'Robot'],
   ['head-rock', 'Rock'],
   ['head-rosebud', 'Rosebud'],
   ['head-ruler-triangular', 'Ruler Triangular'],
   ['head-saguaro', 'Saguaro'],
   ['head-sailboat', 'Sailboat'],
   ['head-sandwich', 'Sandwich'],
   ['head-saturn', 'Saturn'],
   ['head-saw', 'Saw'],
   ['head-scorpion', 'Scorpion'],
   ['head-shark', 'Shark'],
   ['head-shower', 'Shower'],
   ['head-skateboard', 'Skateboard'],
   ['head-skeleton-hat', 'Skeleton Hat'],
   ['head-skilift', 'Skilift'],
   ['head-smile', 'Smile'],
   ['head-snowglobe', 'Snowglobe'],
   ['head-snowmobile', 'Snowmobile'],
   ['head-spaghetti', 'Spaghetti'],
   ['head-sponge', 'Sponge'],
   ['head-squid', 'Squid'],
   ['head-stapler', 'Stapler'],
   ['head-star-sparkles', 'Star Sparkles'],
   ['head-steak', 'Steak'],
   ['head-sunset', 'Sunset'],
   ['head-taco-classic', 'Taco Classic'],
   ['head-taxi', 'Taxi'],
   ['head-thumbsup', 'Thumbsup'],
   ['head-toaster', 'Toaster'],
   ['head-toiletpaper-full', 'Toiletpaper Full'],
   ['head-tooth', 'Tooth'],
   ['head-toothbrush-fresh', 'Fresh Toothbrush'],
   ['head-tornado', 'Tornado'],
   ['head-trashcan', 'Trashcan'],
   ['head-turing', 'Turing'],
   ['head-ufo', 'Ufo'],
   ['head-undead', 'Undead'],
   ['head-unicorn', 'Unicorn'],
   ['head-vent', 'Vent'],
   ['head-void', 'Void'],
   ['head-volcano', 'Volcano'],
   ['head-volleyball', 'Volleyball'],
   ['head-wall', 'Wall'],
   ['head-wallet', 'Wallet'],
   ['head-wallsafe', 'Wallsafe'],
   ['head-washingmachine', 'Washing Machine'],
   ['head-watch', 'Watch'],
   ['head-watermelon', 'Watermelon'],
   ['head-wave', 'Wave'],
   ['head-weed', 'Weed'],
   ['head-weight', 'Weight'],
   ['head-werewolf', 'Werewolf'],
   ['head-whale-alive', 'Whale Alive'],
   ['head-whale', 'Whale'],
   ['head-wine', 'Wine'],
   ['head-wizardhat', 'Wizardhat'],
   ['head-zebra', 'Zebra'],
   ['head-capybara', 'Capybara'],
   ['head-couch', 'Couch'],
   ['head-hanger', 'Hanger'],
   ['head-index-card', 'Index Card'],
   ['head-snowman', 'Snowman'],
   ['head-treasurechest', 'Treasure Chest'],
   ['head-vending-machine', 'Vending Machine'],
   ['head-wine-barrel', 'Wine Barrel'],
   ['head-backpack', 'Backpack'],
   ['head-beanie', 'Beanie'],
   ['head-beluga', 'Beluga'],
   ['head-cotton-candy', 'Cotton Candy'],
   ['head-curling-stone', 'Curling Stone'],
   ['head-fax-machine', 'Fax Machine'],
   ['head-satellite', 'Satellite'],
   ['head-tiger', 'Tiger'],
   ['glasses-hip-rose', 'Hip Rose'],
   ['glasses-square-black-eyes-red', 'Black Eyes Red'],
   ['glasses-square-black-rgb', 'Black RGB'],
   ['glasses-square-black', 'Black'],
   ['glasses-square-blue-med-saturated', 'Blue Saturated'],
   ['glasses-square-blue', 'Blue'],
   ['glasses-square-frog-green', 'Frog Green'],
   ['glasses-square-fullblack', 'Full Black'],
   ['glasses-square-green-blue-multi', 'Green Blue Multi'],
   ['glasses-square-grey-light', 'Grey Light'],
   ['glasses-square-guava', 'Guava'],
   ['glasses-square-honey', 'Honey'],
   ['glasses-square-magenta', 'Magenta'],
   ['glasses-square-orange', 'Orange'],
   ['glasses-square-pink-purple-multi', 'Pink Purple Multi'],
   ['glasses-square-red', 'Red'],
   ['glasses-square-smoke', 'Smoke'],
   ['glasses-square-teal', 'Teal'],
   ['glasses-square-watermelon', 'Watermelon'],
   ['glasses-square-yellow-orange-multi', 'Yellow Orange Multi'],
   ['glasses-square-yellow-saturated', 'Yellow Saturated'],
   ['glasses-deep-teal', 'Deep Teal'],
   ['glasses-grass', 'Grass'],
])

function parseTraits(traits: { filename: string; data: string }[]): PartType[] {
   console.log(traits)
   return traits.map((d) => {
      return {
         svg: dataTo64SVG(d.data),
         name: filenameToHumanReadable.get(d.filename)!,
         filename: d.filename,
      }
   })
}

export function generateNoun() {
   /*const parts = [
      { data: bodies.find((x) => x.filename == 'body-grayscale-7')!.data },
      { data: accessories.find((x) => x.filename == 'accessory-bling-sparkles')!.data },
      { data: heads.find((x) => x.filename == 'head-crt-bsod')!.data },
      { data: glasses.find((x) => x.filename == 'glasses-square-red')!.data },
   ]*/
   // console.log(parts)

   const parts = [
      {
         data: '0x0015171f093a0d01000d0d01000d0d01000d0d01000d0d01000d0d01000d0d01000b0d',
      },
      {
         data: '0x0016141d0c01000127060003270100012702000127010001270200012706000327030007270300032706000127070001270300',
      },
      {
         data: '0x00051a15040400120104001201020004010167025b01670a5b0801025b01670b5b08010167025b01670a5b08010e5b08010e5b08010e5b08010e5b020102b104010e5b08010e5b020102b104010e5b08010e5b020102b104010e5b0f01012401010124060102000a0101240101012401010124050104001201',
      },
      {
         data: '0x000b17100703000625010006250300012502020224012501000125020202240525020202240325020202240225020001250202022401250100012502020224022502000125020202240125010001250202022401250300062501000625',
      },
   ]
   /*console.log(ImageData.palette.map((v) => {return `"${v}",`}))
   console.log(ImageData.palette)*/
   return `data:image/svg+xml;base64,${btoa(
      buildSVG(parts, ImageData.palette /*, "ccaa55" OPTIONAL BG */)
   )}`
}

export const categories: { name: string; traits: PartType[] }[] = [
   { name: 'Accessories', traits: parseTraits(accessories) },
   { name: 'Glasses', traits: parseTraits(glasses) },
   { name: 'Heads', traits: parseTraits(heads) },
   { name: 'Bodies', traits: parseTraits(bodies) },
   {
      name: 'Backgrounds',
      traits: [
         { svg: getBackgroundSVG(0), name: 'Cool', filename: 'bg-cool' },
         { svg: getBackgroundSVG(1), name: 'Warm', filename: 'bg-warm' },
      ],
   },
]

export function initializeStore() {
   const starter: Map<string, number> = new Map()
   filenameToHumanReadable.forEach((value, key) => starter.set(key, 0))
   return starter
}
