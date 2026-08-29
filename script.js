let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  exposure: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const filterContainer = document.querySelector(".filters");
const canvas = document.querySelector("#image-canvas");
const canvasCtx = canvas.getContext("2d");
const imgInput = document.querySelector("#image-input");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".presets");

let file = null;
let image = null;

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerHTML = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    // console.log(name , filters[name])
    applyFilters();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElemnt = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );
    filterContainer.appendChild(filterElemnt);
  });
}
createFilters();

imgInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  const imgplaceholder = document.querySelector(".placeholder");
  canvas.style.display = "block";
  imgplaceholder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    canvas.width = img.width;
    canvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
  console.log(file);
});

function applyFilters() {
  if (!image) return;

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

  canvasCtx.drawImage(image, 0, 0);
  canvasCtx.filter = "none";
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    exposure: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
  };
  applyFilters();

  filterContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});

const presets = {
  drama: {
    brightness: 105,
    contrast: 145,
    exposure: 100,
    saturation: 115,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    exposure: 100,
    saturation: 75,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 35,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 100,
    contrast: 85,
    exposure: 100,
    saturation: 65,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 45,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 105,
    exposure: 100,
    saturation: 125,
    hueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    exposure: 100,
    saturation: 105,
    hueRotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  blackWhite: {
    brightness: 105,
    contrast: 125,
    exposure: 100,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  fade: {
    brightness: 110,
    contrast: 80,
    exposure: 100,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 5,
    opacity: 90,
    invert: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 135,
    exposure: 100,
    saturation: 90,
    hueRotation: 5,
    blur: 0,
    grayscale: 5,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");

  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];
    // console.log("Preset:", preset);

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });

    applyFilters();

    filterContainer.innerHTML=""
    createFilters()
  });

  presetContainer.appendChild(presetBtn);
});
