// ============ SCHEME FORM CONFIG ============
const SCHEME_FORM = {
  schemeName: "PM-KISAN",
  officialUrl: "https://pmkisan.gov.in/RegistrationForm.aspx",
  estimatedTime: 1800, // 30 min original
  
  steps: [
    {
      id: 'personal',
      title: 'Personal Details',
      icon: '👤',
      instruction: {
        heading: "Step 1: Personal Information",
        description: "Enter your name EXACTLY as it appears on your Aadhaar card.",
        tips: [
          "✅ Use English letters only",
          "✅ Match Aadhaar spelling exactly",
          "❌ Don't use nicknames"
        ],
        warning: "If name doesn't match Aadhaar, application will be rejected!",
        sampleImage: "https://i.imgur.com/sample.png",
        videoUrl: "https://youtube.com/embed/xxx"
      },
      fields: [
        { name: 'fullName', label: 'Full Name (as per Aadhaar)', type: 'text', required: true, placeholder: 'RAJESH KUMAR', validate: 'name' },
        { name: 'fatherName', label: "Father's Name", type: 'text', required: true, placeholder: 'SURESH KUMAR' },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'mobile', label: 'Mobile Number', type: 'tel', required: true, placeholder: '9876543210', validate: 'mobile' }
      ]
    },
    {
      id: 'aadhaar',
      title: 'Aadhaar Details',
      icon: '🆔',
      instruction: {
        heading: "Step 2: Aadhaar Verification",
        description: "Your Aadhaar must be linked to your bank account & mobile number.",
        tips: [
          "✅ Keep your Aadhaar card ready",
          "✅ Mobile linked to Aadhaar (for OTP)",
          "✅ Bank account seeded with Aadhaar",
          "ℹ️ Check Aadhaar-bank link: https://resident.uidai.gov.in"
        ],
        warning: "Without Aadhaar-Bank seeding, money won't be credited!",
        howToCheck: "Call *99# on Aadhaar-linked mobile → check status"
      },
      fields: [
        { name: 'aadhaar', label: 'Aadhaar Number', type: 'text', required: true, placeholder: '1234 5678 9012', validate: 'aadhaar', maxLength: 14 },
        { name: 'aadhaarLinked', label: 'Is Aadhaar linked to bank account?', type: 'radio', options: ['Yes', 'No'], required: true }
      ]
    },
    {
      id: 'address',
      title: 'Address',
      icon: '🏠',
      instruction: {
        heading: "Step 3: Address Details",
        description: "Enter your CURRENT residential address. Must match land records district.",
        tips: [
          "✅ Use postal address format",
          "✅ Pincode must be valid",
          "✅ Match land documents district"
        ]
      },
      fields: [
        { name: 'state', label: 'State', type: 'select', options: ['Punjab', 'Haryana', 'UP', 'MP', 'Bihar', 'Other'], required: true },
        { name: 'district', label: 'District', type: 'text', required: true },
        { name: 'village', label: 'Village/Town', type: 'text', required: true },
        { name: 'pincode', label: 'Pincode', type: 'text', required: true, validate: 'pincode', maxLength: 6 }
      ]
    },
    {
      id: 'land',
      title: 'Land Details',
      icon: '🌾',
      instruction: {
        heading: "Step 4: Agricultural Land Details",
        description: "Enter details from your Khatauni / land record document.",
        tips: [
          "✅ Khasra/Survey number from land papers",
          "✅ Total area in hectares",
          "❌ Maximum 2 hectares (small farmer)",
          "📷 Keep land records photo ready"
        ],
        warning: "Only farmers with cultivable land qualify",
        sampleImage: "https://i.imgur.com/landrecord.png"
      },
      fields: [
        { name: 'khasra', label: 'Khasra/Survey Number', type: 'text', required: true, placeholder: '123/45' },
        { name: 'landSize', label: 'Land Size (Hectares)', type: 'number', required: true, step: '0.01', placeholder: '1.5' },
        { name: 'landType', label: 'Type of Land', type: 'select', options: ['Owned', 'Leased', 'Sharecropped'], required: true },
        { name: 'landDoc', label: 'Upload Land Document', type: 'file', accept: 'image/*,.pdf', required: true }
      ]
    },
    {
      id: 'bank',
      title: 'Bank Details',
      icon: '🏦',
      instruction: {
        heading: "Step 5: Bank Account Details",
        description: "₹6,000/year will be credited directly to this account.",
        tips: [
          "✅ Use Aadhaar-linked account",
          "✅ Active savings account",
          "✅ Match name on bank passbook",
          "💡 Find IFSC: bank passbook or cheque"
        ]
      },
      fields: [
        { name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'State Bank of India' },
        { name: 'accountNo', label: 'Account Number', type: 'text', required: true, validate: 'account' },
        { name: 'ifsc', label: 'IFSC Code', type: 'text', required: true, placeholder: 'SBIN0001234', validate: 'ifsc', maxLength: 11 },
        { name: 'branchName', label: 'Branch Name', type: 'text', required: true }
      ]
    }
  ]
};

let currentStep = 0;
let formData = JSON.parse(localStorage.getItem('pmkisan_draft') || '{}');
let timeSavedCounter = 0;

// ============ INIT ============
window.onload = () => {
  renderStepNav();
  renderStep();
  startTimeSavedCounter();
};

// ============ STEP NAVIGATION ============
function renderStepNav() {
  const nav = document.getElementById('stepNav');
  nav.innerHTML = SCHEME_FORM.steps.map((s, i) => `
    <div class="flex items-center gap-2 cursor-pointer ${i === currentStep ? 'font-bold text-orange-600' : 'text-gray-500'}" onclick="jumpToStep(${i})">
      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm ${i === currentStep ? 'step-active' : i < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'}">
        ${i < currentStep ? '✓' : i + 1}
      </div>
      <span class="hidden md:inline">${s.title}</span>
    </div>
  `).join('<div class="flex-1 border-t border-dashed mx-2"></div>');
  
  document.getElementById('progressBar').style.width = `${((currentStep+1)/SCHEME_FORM.steps.length)*100}%`;
}

// ============ RENDER CURRENT STEP ============
function renderStep() {
  const step = SCHEME_FORM.steps[currentStep];
  
  // LEFT: Instructions
  document.getElementById('instructionPanel').innerHTML = `
    <div class="text-4xl mb-3">${step.icon}</div>
    <h2 class="text-2xl font-bold mb-2">${step.instruction.heading}</h2>
    <p class="text-gray-600 mb-4">${step.instruction.description}</p>
    
    ${step.instruction.warning ? `
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
        <div class="font-semibold text-red-700">⚠️ Important</div>
        <div class="text-sm text-red-600">${step.instruction.warning}</div>
      </div>
    ` : ''}
    
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
      <div class="font-semibold text-blue-700 mb-2">💡 Tips</div>
      <ul class="text-sm space-y-1">
        ${step.instruction.tips.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
    
    ${step.instruction.sampleImage ? `
      <div class="border rounded-xl p-3 mb-4">
        <div class="text-xs text-gray-500 mb-2">📷 Sample reference:</div>
        <div class="bg-gray-100 h-40 rounded flex items-center justify-center text-gray-400">
          [Sample image: ${step.icon}]
        </div>
      </div>
    ` : ''}
    
    ${step.instruction.howToCheck ? `
      <div class="bg-yellow-50 p-3 rounded-lg text-sm">
        <strong>How to check:</strong> ${step.instruction.howToCheck}
      </div>
    ` : ''}
    
    <button onclick="openHelpBot()" class="w-full mt-4 py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 hover:bg-orange-50">
      🤖 Need help? Ask AI
    </button>
  `;
  
  // RIGHT: Form
  document.getElementById('formPanel').innerHTML = `
    <div class="mb-6">
      <div class="text-sm text-gray-500">Step ${currentStep+1} of ${SCHEME_FORM.steps.length}</div>
      <h2 class="text-2xl font-bold">${step.title}</h2>
    </div>
    
    <form id="stepForm" class="space-y-4">
      ${step.fields.map(f => renderField(f)).join('')}
    </form>
    
    <div class="flex gap-3 mt-6">
      ${currentStep > 0 ? `<button onclick="prevStep()" class="px-6 py-3 border-2 rounded-xl font-semibold">← Back</button>` : ''}
      <button onclick="nextStep()" class="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
        ${currentStep === SCHEME_FORM.steps.length - 1 ? '✓ Preview & Submit' : 'Next Step →'}
      </button>
    </div>
  `;
  
  // Restore saved data
  Object.keys(formData).forEach(key => {
    const el = document.querySelector(`[name="${key}"]`);
    if (el) el.value = formData[key];
  });
  
  renderStepNav();
}

// ============ FIELD RENDERING ============
function renderField(f) {
  const baseClass = "w-full px-4 py-3 border-2 rounded-xl outline-none focus:border-orange-500 transition";
  
  let input = '';
  if (f.type === 'select') {
    input = `<select name="${f.name}" class="${baseClass}" ${f.required?'required':''}>
      <option value="">-- Select --</option>
      ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
    </select>`;
  } else if (f.type === 'radio') {
    input = `<div class="flex gap-4">
      ${f.options.map(o => `
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="${f.name}" value="${o}" ${f.required?'required':''}>
          <span>${o}</span>
        </label>
      `).join('')}
    </div>`;
  } else if (f.type === 'file') {
    input = `<input type="file" name="${f.name}" accept="${f.accept||''}" class="${baseClass}" ${f.required?'required':''}>`;
  } else {
    input = `<input type="${f.type}" name="${f.name}" placeholder="${f.placeholder||''}" maxlength="${f.maxLength||''}" step="${f.step||''}" class="${baseClass}" ${f.required?'required':''} oninput="validateField(this, '${f.validate||''}')">`;
  }
  
  return `
    <div>
      <label class="block text-sm font-semibold mb-2">${f.label} ${f.required?'<span class="text-red-500">*</span>':''}</label>
      ${input}
      <div class="text-xs text-red-500 mt-1 hidden" id="err_${f.name}"></div>
    </div>
  `;
}

// ============ VALIDATION ============
function validateField(el, type) {
  const errEl = document.getElementById('err_' + el.name);
  const v = el.value;
  let valid = true, msg = '';
  
  switch(type) {
    case 'aadhaar':
      // Format as XXXX XXXX XXXX
      el.value = v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();
      if (v.replace(/\s/g,'').length === 12) {
        valid = /^\d{12}$/.test(v.replace(/\s/g,''));
        if (!valid) msg = 'Invalid Aadhaar (12 digits)';
      }
      break;
    case 'mobile':
      valid = /^[6-9]\d{9}$/.test(v);
      if (v.length === 10 && !valid) msg = 'Invalid mobile (start with 6-9)';
      break;
    case 'pincode':
      valid = /^\d{6}$/.test(v);
      if (v.length === 6 && !valid) msg = 'Invalid pincode';
      break;
    case 'ifsc':
      el.value = v.toUpperCase();
      valid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.toUpperCase());
      if (v.length === 11 && !valid) msg = 'Invalid IFSC format';
      break;
    case 'name':
      valid = /^[A-Za-z\s]+$/.test(v);
      if (v && !valid) msg = 'Use English letters only';
      break;
  }
  
  if (msg) {
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
    el.classList.add('border-red-500');
  } else {
    errEl.classList.add('hidden');
    el.classList.remove('border-red-500');
  }
}

// ============ NAVIGATION ============
function nextStep() {
  // Validate
  const form = document.getElementById('stepForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Save data
  saveStepData();
  
  if (currentStep < SCHEME_FORM.steps.length - 1) {
    currentStep++;
    renderStep();
    window.scrollTo(0, 0);
  } else {
    showPreview();
  }
}

function prevStep() {
  saveStepData();
  if (currentStep > 0) {
    currentStep--;
    renderStep();
    window.scrollTo(0, 0);
  }
}

function jumpToStep(i) {
  saveStepData();
  if (i <= currentStep) {
    currentStep = i;
    renderStep();
  }
}

function saveStepData() {
  const form = document.getElementById('stepForm');
  if (!form) return;
  const fd = new FormData(form);
  for (let [k, v] of fd) formData[k] = v;
  localStorage.setItem('pmkisan_draft', JSON.stringify(formData));
}

function saveProgress() {
  saveStepData();
  alert('✅ Progress saved! You can resume anytime.');
}

// ============ PREVIEW & SUBMIT ============
function showPreview() {
  saveStepData();
  
  document.body.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <div class="text-center mb-6">
          <div class="text-6xl mb-3">📋</div>
          <h1 class="text-3xl font-bold">Preview Your Application</h1>
          <p class="text-gray-600">Verify all details before submitting</p>
        </div>
        
        ${SCHEME_FORM.steps.map(step => `
          <div class="mb-6 border-2 rounded-xl p-4">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-bold text-lg">${step.icon} ${step.title}</h3>
              <button onclick="editStep('${step.id}')" class="text-orange-600 text-sm">✏️ Edit</button>
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              ${step.fields.map(f => `
                <div>
                  <div class="text-gray-500 text-xs">${f.label}</div>
                  <div class="font-semibold">${formData[f.name] || '<span class="text-red-500">Not filled</span>'}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        
        <div class="bg-yellow-50 p-4 rounded-xl mb-6">
          <div class="font-semibold mb-2">⚠️ Important Notice</div>
          <div class="text-sm">SchemeBuddy helps you prepare your application. Final submission must be done on the official government portal: <strong>pmkisan.gov.in</strong></div>
        </div>
        
        <div class="space-y-3">
          <button onclick="submitToOfficial()" class="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition">
            🚀 Submit on Official Portal
          </button>
          <button onclick="downloadPDF()" class="w-full border-2 py-3 rounded-xl font-semibold">
            📥 Download as PDF
          </button>
          <button onclick="copyToClipboard()" class="w-full border-2 py-3 rounded-xl font-semibold">
            📋 Copy All Details (paste on govt site)
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============ SUBMIT TO OFFICIAL ============
function submitToOfficial() {
  // METHOD 1: Open govt site with copied data
  copyToClipboard();
  
  alert(`✅ Your details are copied!\n\n👉 Next steps:\n1. We'll open the official PM-KISAN site\n2. Click 'New Farmer Registration'\n3. Paste your details (Ctrl+V) where applicable\n4. Complete OTP verification\n5. Submit\n\nYour data is saved if you need to come back!`);
  
  // Open official site
  window.open(SCHEME_FORM.officialUrl, '_blank');
  
  // Track conversion
  fetch('/api/track-application', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ scheme: 'pm-kisan', timestamp: Date.now() })
  });
}

function copyToClipboard() {
  const text = SCHEME_FORM.steps.map(step => 
    `=== ${step.title} ===\n` + 
    step.fields.map(f => `${f.label}: ${formData[f.name] || ''}`).join('\n')
  ).join('\n\n');
  
  navigator.clipboard.writeText(text);
  alert('✅ All details copied to clipboard!');
}

function downloadPDF() {
  // Generate printable HTML
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html><head><title>PM-KISAN Application</title>
    <style>body{font-family:Arial;padding:40px} h1{color:#f97316} .field{margin:10px 0;padding:8px;border-bottom:1px solid #eee}</style>
    </head><body>
    <h1>PM-KISAN Application Draft</h1>
    <p>Generated by SchemeBuddy on ${new Date().toLocaleDateString()}</p>
    ${SCHEME_FORM.steps.map(step => `
      <h2>${step.title}</h2>
      ${step.fields.map(f => `<div class="field"><strong>${f.label}:</strong> ${formData[f.name] || ''}</div>`).join('')}
    `).join('')}
    <p><em>Submit at: ${SCHEME_FORM.officialUrl}</em></p>
    </body></html>
  `);
  printWindow.print();
}

function editStep(stepId) {
  currentStep = SCHEME_FORM.steps.findIndex(s => s.id === stepId);
  location.reload();
}

// ============ TIME SAVED COUNTER ============
function startTimeSavedCounter() {
  setInterval(() => {
    timeSavedCounter += 2;
    document.getElementById('timeSaved').textContent = timeSavedCounter;
  }, 1000);
}

// ============ AI HELP BOT ============
function openHelpBot() {
  const step = SCHEME_FORM.steps[currentStep];
  const help = prompt(`🤖 Need help with "${step.title}"?\n\nType your question:`);
  if (help) {
    alert(`💡 Common help for "${step.title}":\n\n${step.instruction.tips.join('\n')}\n\n📞 Helpline: 011-24300606\n📧 Email: pmkisan-ict@gov.in`);
  }
}
