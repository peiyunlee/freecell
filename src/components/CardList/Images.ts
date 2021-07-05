interface ImagesKeys {
    [key: string]: any
}

const requireContext = require.context("../../assets/images/cards", false, /^\.\/.*\.png$/);

let images: ImagesKeys = {}

requireContext.keys().map((item: string) => {
    let property = item.replace('./', '').replace('.png', '')
    images[property] = requireContext(item).default;
});

export default images;