```javascript id="r5h7n2"
// =====================================================
// SMART APPLY ENGINE (Dynamic JSON Version)
// File: smart-apply.js
// =====================================================

// ================= GET SCHEME ID =================

const params = new URLSearchParams(window.location.search);

const schemeId =
  params.get('scheme');

// ================= GLOBAL STATE =================

let SCHEME_FORM = null;

let currentStep = 0;

let formData = {};

let timeSavedCounter = 0;

// =====================================================
// LOAD SCHEME FROM JSON
// =====================================================

async function loadScheme() {

  try {

    // LOAD JSON FILE

    const response = await fetch('./data/schemes.json');

    const schemes =
      await response.json();

    // FIND MATCHING SCHEME

    SCHEME_FORM =
      schemes.find(
        s => s.id === schemeId
      );

    // IF NOT FOUND

    if (!SCHEME_FORM) {

      document.body.innerHTML = `

        <div class="p-10 text-center">

          <h1 class="text-4xl font-bold mb-4">
            Scheme Not Found
          </h1>

          <p class="text-gray-600">
            Invalid scheme selected
          </p>

        </div>

      `;

      return;
    }

    // LOAD DRAFT

    formData = JSON.parse(
      localStorage.getItem(
        `draft_${schemeId}`
      ) || '{}'
    );

    // START APP

    initApp();

  }

  catch (err) {

    console.error(err);

    document.body.innerHTML = `

      <div class="p-10 text-center">

        <h1 class="text-3xl font-bold text-red-600 mb-4">
          Failed To Load Scheme
        </h1>

      </div>

    `;
  }
}

// =====================================================
// INIT APP
// =====================================================

function initApp() {

  document.getElementById(
    'schemeTitle'
  ).innerText =
    SCHEME_FORM.schemeName;

  renderStepNav();

  renderStep();

  startTimeSavedCounter();

}

// =====================================================
// STEP NAVIGATION
// =====================================================

function renderStepNav() {

  const nav =
    document.getElementById('stepNav');

  nav.innerHTML =
    SCHEME_FORM.steps.map((s, i) => `

      <div class="flex items-center gap-2">

        <div
          onclick="jumpToStep(${i})"
          class="
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
            text-sm

            ${i === currentStep
              ? 'bg-orange-500 text-white'
              : i < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-300'
            }
          ">

          ${i < currentStep
            ? '✓'
            : i + 1
          }

        </div>

        <span class="hidden md:inline">
          ${s.title}
        </span>

      </div>

    `).join('');

  // PROGRESS BAR

  document.getElementById(
    'progressBar'
  ).style.width =
    `${((currentStep + 1)
      / SCHEME_FORM.steps.length) * 100}%`;

}

// =====================================================
// RENDER CURRENT STEP
// =====================================================

function renderStep() {

  const step =
    SCHEME_FORM.steps[currentStep];

  // ================= LEFT PANEL =================

  document.getElementById(
    'instructionPanel'
  ).innerHTML = `

    <div class="text-5xl mb-4">
      ${step.icon || '📄'}
    </div>

    <h2 class="text-2xl font-bold mb-3">
      ${step.instruction?.heading || step.title}
    </h2>

    <p class="text-gray-600 mb-5">
      ${step.instruction?.description || ''}
    </p>

    ${step.instruction?.warning
      ? `
        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-4">

          <div class="font-bold text-red-700 mb-1">
            Important
          </div>

          <div class="text-red-600 text-sm">
            ${step.instruction.warning}
          </div>

        </div>
      `
      : ''
    }

    ${step.instruction?.tips
      ? `
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">

          <div class="font-bold text-blue-700 mb-2">
            Tips
          </div>

          <ul class="space-y-1 text-sm">

            ${step.instruction.tips.map(t => `
              <li>${t}</li>
            `).join('')}

          </ul>

        </div>
      `
      : ''
    }

  `;

  // ================= RIGHT PANEL =================

  document.getElementById(
    'formPanel'
  ).innerHTML = `

    <div class="mb-6">

      <div class="text-sm text-gray-500">
        Step ${currentStep + 1}
        of
        ${SCHEME_FORM.steps.length}
      </div>

      <h2 class="text-3xl font-bold">
        ${step.title}
      </h2>

    </div>

    <form
      id="stepForm"
      class="space-y-4">

      ${step.fields.map(
        renderField
      ).join('')}

    </form>

    <div class="flex gap-3 mt-6">

      ${currentStep > 0
        ? `
          <button
            onclick="prevStep()"
            class="
              px-6
              py-3
              border
              rounded-xl
            ">

            Back

          </button>
        `
        : ''
      }

      <button
        onclick="nextStep()"
        class="
          flex-1
          bg-gradient-to-r
          from-orange-500
          to-green-600
          text-white
          py-3
          rounded-xl
        ">

        ${currentStep ===
          SCHEME_FORM.steps.length - 1
            ? 'Preview'
            : 'Next Step'}

      </button>

    </div>

  `;

  restoreData();

  renderStepNav();

}

// =====================================================
// FIELD RENDERER
// =====================================================

function renderField(f) {

  const cls = `
    w-full
    px-4
    py-3
    border-2
    rounded-xl
    outline-none
    focus:border-orange-500
  `;

  let input = '';

  // ================= SELECT =================

  if (f.type === 'select') {

    input = `

      <select
        name="${f.name}"
        class="${cls}"
        ${f.required ? 'required' : ''}>

        <option value="">
          Select
        </option>

        ${f.options.map(o => `
          <option value="${o}">
            ${o}
          </option>
        `).join('')}

      </select>

    `;
  }

  // ================= RADIO =================

  else if (f.type === 'radio') {

    input = `

      <div class="flex gap-4">

        ${f.options.map(o => `

          <label class="flex items-center gap-2">

            <input
              type="radio"
              name="${f.name}"
              value="${o}">

            <span>${o}</span>

          </label>

        `).join('')}

      </div>

    `;
  }

  // ================= FILE =================

  else if (f.type === 'file') {

    input = `

      <input
        type="file"
        name="${f.name}"
        class="${cls}"
        accept="${f.accept || ''}">

    `;
  }

  // ================= NORMAL INPUT =================

  else {

    input = `

      <input
        type="${f.type}"
        name="${f.name}"
        placeholder="${f.placeholder || ''}"
        maxlength="${f.maxLength || ''}"
        step="${f.step || ''}"
        class="${cls}"
        ${f.required ? 'required' : ''}
        oninput="validateField(this,'${f.validate || ''}')"
      >

    `;
  }

  return `

    <div>

      <label class="block mb-2 font-semibold">

        ${f.label}

        ${f.required
          ? '<span class="text-red-500">*</span>'
          : ''
        }

      </label>

      ${input}

      <div
        id="err_${f.name}"
        class="
          hidden
          text-red-500
          text-sm
          mt-1
        ">
      </div>

    </div>

  `;
}

// =====================================================
// VALIDATION
// =====================================================

function validateField(el, type) {

  const errEl =
    document.getElementById(
      'err_' + el.name
    );

  let valid = true;

  let msg = '';

  let v = el.value;

  switch(type) {

    // ================= MOBILE =================

    case 'mobile':

      valid =
        /^[6-9]\d{9}$/.test(v);

      if (
        v.length === 10 &&
        !valid
      ) {
        msg = 'Invalid mobile number';
      }

      break;

    // ================= AADHAAR =================

    case 'aadhaar':

      el.value = v
        .replace(/\D/g,'')
        .replace(/(.{4})/g,'$1 ')
        .trim();

      const cleaned =
        el.value.replace(/\s/g,'');

      valid =
        /^\d{12}$/.test(cleaned);

      if (
        cleaned.length === 12 &&
        !valid
      ) {
        msg = 'Invalid Aadhaar';
      }

      break;

    // ================= PINCODE =================

    case 'pincode':

      valid =
        /^\d{6}$/.test(v);

      if (
        v.length === 6 &&
        !valid
      ) {
        msg = 'Invalid pincode';
      }

      break;

    // ================= NAME =================

    case 'name':

      valid =
        /^[A-Za-z\s]+$/.test(v);

      if (
        v &&
        !valid
      ) {
        msg =
          'Use English letters only';
      }

      break;
  }

  if (msg) {

    errEl.innerText = msg;

    errEl.classList.remove('hidden');

    el.classList.add('border-red-500');

  }

  else {

    errEl.classList.add('hidden');

    el.classList.remove('border-red-500');

  }

}

// =====================================================
// NEXT STEP
// =====================================================

function nextStep() {

  const form =
    document.getElementById(
      'stepForm'
    );

  if (!form.checkValidity()) {

    form.reportValidity();

    return;
  }

  saveStepData();

  if (
    currentStep <
    SCHEME_FORM.steps.length - 1
  ) {

    currentStep++;

    renderStep();

    window.scrollTo(0,0);

  }

  else {

    showPreview();

  }

}

// =====================================================
// PREV STEP
// =====================================================

function prevStep() {

  saveStepData();

  currentStep--;

  renderStep();

}

// =====================================================
// JUMP STEP
// =====================================================

function jumpToStep(i) {

  saveStepData();

  currentStep = i;

  renderStep();

}

// =====================================================
// SAVE STEP DATA
// =====================================================

function saveStepData() {

  const form =
    document.getElementById(
      'stepForm'
    );

  if (!form) return;

  const fd =
    new FormData(form);

  for (let [k,v] of fd) {

    formData[k] = v;

  }

  localStorage.setItem(
    `draft_${schemeId}`,
    JSON.stringify(formData)
  );

}

// =====================================================
// RESTORE DATA
// =====================================================

function restoreData() {

  Object.keys(formData)
    .forEach(key => {

      const el =
        document.querySelector(
          `[name="${key}"]`
        );

      if (!el) return;

      if (el.type === 'radio') {

        const radio =
          document.querySelector(
            `[name="${key}"][value="${formData[key]}"]`
          );

        if (radio) {
          radio.checked = true;
        }

      }

      else {

        el.value =
          formData[key];

      }

    });

}

// =====================================================
// SHOW PREVIEW
// =====================================================

function showPreview() {

  saveStepData();

  document.body.innerHTML = `

    <div class="max-w-5xl mx-auto p-6">

      <div class="bg-white rounded-3xl shadow-xl p-8">

        <div class="text-center mb-8">

          <h1 class="text-4xl font-bold mb-2">
            Preview Application
          </h1>

          <p class="text-gray-600">
            Verify details before submission
          </p>

        </div>

        ${SCHEME_FORM.steps.map(step => `

          <div class="border rounded-2xl p-5 mb-5">

            <h2 class="font-bold text-xl mb-4">

              ${step.icon || '📄'}
              ${step.title}

            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              ${step.fields.map(f => `

                <div>

                  <div class="text-gray-500 text-sm">
                    ${f.label}
                  </div>

                  <div class="font-semibold">

                    ${formData[f.name] || '-'}

                  </div>

                </div>

              `).join('')}

            </div>

          </div>

        `).join('')}

        <button
          onclick="submitApplication()"
          class="
            w-full
            bg-gradient-to-r
            from-orange-500
            to-green-600
            text-white
            py-4
            rounded-2xl
            text-lg
            font-bold
          ">

          Submit On Official Website

        </button>

      </div>

    </div>

  `;
}

// =====================================================
// SUBMIT
// =====================================================

function submitApplication() {

  window.open(
    SCHEME_FORM.officialUrl,
    '_blank'
  );

}

// =====================================================
// TIME SAVED COUNTER
// =====================================================

function startTimeSavedCounter() {

  setInterval(() => {

    timeSavedCounter++;

    const el =
      document.getElementById(
        'timeSaved'
      );

    if (el) {
      el.innerText =
        timeSavedCounter;
    }

  }, 1000);

}

// =====================================================
// START
// =====================================================

loadScheme();
```
