"use client";
import { useState } from "react";
import { 
  CarFront, 
  MapPin, 
  Clock, 
  Navigation, 
  Building2, 
  ArrowRight ,Users,FileBarChart,DoorOpen,Key,Ruler,ShieldCheck,Ticket, Coins, Banknote, Receipt, Percent,UserCog, FileText,ShieldUser, User, Mail, Phone, GraduationCap, CheckCircle
} from "lucide-react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  // Placeholder for form data state
  const [formData, setFormData] = useState({
  // STEP 1
  locationName: "",
  capacity: "",
  waitTime: "",
  mapsUrl: "",
  latitude: "",
  longitude: "",
  timing: "",
  address: "",

  // STEP 2
  lobbies: "",
  keyRooms: "",
  distance: "",
  supervisorUser: "no",
  validationUser: "no",
  reportUser: "no",

  // STEP 3
  ticketType: "",
  feeType: "",
  ticketPricing: "",
  vatType: "",

  // STEP 4
  driverCount: "",
  driverList: "",

  // STEP 5
  adminName: "",
  adminEmail: "",
  adminPhone: "",
  trainingRequired: "",

  // STEP 6 (attachments & text)
  logoCompany: null,
  logoClient: null,
  vatCertificate: null,
  tradeLicense: null,
  documentSubmitMethod: ""
});


  const handleNext = () => {
    // You can add validation here before moving to next step
    setCurrentStep((prev) => prev + 1);
  };
  // Handle form input changes
const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === "file") {
    setFormData({ ...formData, [name]: files[0] });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
const handleFinalSubmit = async () => {
  const formDataToSend = new FormData();

  // Append all text fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && typeof value !== "object") {
      formDataToSend.append(key, value);
    }
  });

  // Attach files (converted to backend schema keys)
  if (formData.logoCompany)
    formDataToSend.append("companyLogo", formData.logoCompany);

  if (formData.logoClient)
    formDataToSend.append("clientLogo", formData.logoClient);

  if (formData.vatCertificate)
    formDataToSend.append("vatCertificate", formData.vatCertificate);

  if (formData.tradeLicense)
    formDataToSend.append("tradeLicense", formData.tradeLicense);

  // Submit request
  const res = await fetch("/api/leads", {
    method: "POST",
    body: formDataToSend,
  });

  // Fix: Prevent JSON parse error if server crashed
  if (!res.ok) {
    alert("❌ Error submitting form. Server returned: " + res.status);
    return;
  }

  const data = await res.json();

  if (data.success) {
    alert("🎉 Lead Submitted Successfully!");
    
    // Optional reset
    // window.location.reload();
  } else {
    alert("⚠️ Submission failed: " + data.message);
  }
};




  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-400 shadow-lg p-5 sm:p-8 md:p-10">

        {/* HEADER */}
        <div className="text-center space-y-4 mb-10">
          {/* Eyebrow Label */}
          <div className="flex items-center justify-center">
            <p className="uppercase text-xs sm:text-sm tracking-wider font-semibold text-[#ae5c83] bg-[#ae5c83]/10 px-3 py-1 rounded-md">
              New Valet Parking Lead – Free Signup
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            <CarFront className="w-7 h-7 sm:w-8 sm:h-8 text-black" strokeWidth={2} />
            <span className="text-center">Client Onboarding & Location Setup Form</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please share the details below so we can configure your valet parking automation and dashboard correctly from Day 1.
          </p>
        </div>

        {/* PROGRESS INDICATOR */}
        <div className="mb-8 border-b pb-4">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
               Step {currentStep} of 6
            </p>
            <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                <div 
                    className="bg-[#ae5c83] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* STEP 1: LOCATION INFORMATION */}
{currentStep === 1 && (
  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

    {/* Section Heading */}
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        Location Information
      </h2>
      <p className="text-xs sm:text-sm text-gray-500">
        Basic details about the property where valet parking will be operated.
      </p>
    </div>

    {/* Form Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Full Row - Location Name */}
      <div className="md:col-span-1">
        <label className="
  text-sm font-medium text-gray-900
">
          Location Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="locationName"
          placeholder="e.g. Grand Hyatt Dubai - Main Entrance"
          value={formData.locationName}
          onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
          className="input"
        />
      </div>

      {/* Parking Capacity */}
      <div>
        <label className="text-sm font-medium text-gray-900">
          Parking Capacity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="capacity"
          placeholder="Total number of parking slots"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          className="input"
        />
      </div>

      {/* Waiting Time */}
      <div>
        <label className="text-sm font-medium text-gray-900">
          Average Waiting Time
        </label>
        <input
          type="text"
          name="waitTime"
          placeholder="e.g., 10 – 15 mins"
          value={formData.waitTime}
          onChange={(e) => setFormData({ ...formData, waitTime: e.target.value })}
          className="input"
        />
      </div>

      {/* Google Maps Link */}
      <div className="md:col-span-1">
        <label className="text-sm font-medium text-gray-900">Google Maps Location URL</label>
        <input
          type="url"
          name="mapsUrl"
          placeholder="Paste Google Maps share link"
          value={formData.mapsUrl}
          onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
          className="input"
        />
      </div>

      {/* Latitude */}
      <div>
        <label className="text-sm font-medium text-gray-900">Latitude</label>
        <input
          type="text"
          name="latitude"
          placeholder="e.g., 25.2852° N"
          value={formData.latitude}
          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          className="input"
        />
      </div>

      {/* Longitude */}
      <div>
        <label className="text-sm font-medium text-gray-900">Longitude</label>
        <input
          type="text"
          name="longitude"
          placeholder="e.g., 55.3598° E"
          value={formData.longitude}
          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          className="input"
        />
      </div>

      {/* Operation Timing */}
      <div>
        <label className="text-sm font-medium text-gray-900">Operation Timing</label>
        <input
          type="text"
          name="timing"
          placeholder="e.g., 24 Hours / 10 AM – 2 AM"
          value={formData.timing}
          onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
          className="input"
        />
      </div>

      
      {/* Address */}
      <div className="md:col-span-1">
        <label className="text-sm font-medium text-gray-900">Location TRN / Registered Address</label>
        <textarea
          rows={3}
          name="address"
          placeholder="TRN and full registered address of the property"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="textarea resize-none"
        />
      </div>
    </div>

    {/* Navigation */}
    <div className="pt-2 flex justify-end">
      <button
        onClick={() => {
          if (!formData.locationName || !formData.capacity) {
            alert("Please fill required fields.");
            return;
          }
          handleNext();
        }}
        className="btn-primary flex items-center gap-2"
      >
        Next Step
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
)}




{currentStep === 2 && (
  <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-500">

    {/* Header */}
    <div className="space-y-0">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        On-Site User Setup
      </h2>
      <p className="text-xs sm:text-sm text-gray-500">
        Internal users + operational setup details.
      </p>
    </div>

    {/* Form Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

      {/* Inputs */}
      <div>
        <label className="text-sm font-medium text-gray-900">Number of lobbies / entrances</label>
        <input
          type="number"
          name="lobbies"
          placeholder="e.g., 2"
          value={formData.lobbies}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-900">Number of key control rooms</label>
        <input
          type="number"
          name="keyRooms"
          placeholder="e.g., 1"
          value={formData.keyRooms}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-900">Distance between lobby & key room</label>
        <input
          type="text"
          name="distance"
          placeholder="e.g., 50 meters"
          value={formData.distance}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Empty Cell to Maintain Two-Column Grid */}
      <div></div>

      {/* Radios */}
      <div className="border rounded-lg p-3 bg-gray-50">
        <p className="text-sm font-medium text-gray-900 mb-1">Supervisor user required?</p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="supervisorUser"
              value="yes"
              checked={formData.supervisorUser === "yes"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="supervisorUser"
              value="no"
              checked={formData.supervisorUser === "no"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            No
          </label>
        </div>
      </div>

      <div className="border rounded-lg p-3 bg-gray-50">
        <p className="text-sm font-medium text-gray-900 mb-1">Ticket validation user?</p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="validationUser"
              value="yes"
              checked={formData.validationUser === "yes"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="validationUser"
              value="no"
              checked={formData.validationUser === "no"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            No
          </label>
        </div>
      </div>

      <div className="border rounded-lg p-3 bg-gray-50">
        <p className="text-sm font-medium text-gray-900 mb-1">Finance report access?</p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="reportUser"
              value="yes"
              checked={formData.reportUser === "yes"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="reportUser"
              value="no"
              checked={formData.reportUser === "no"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            No
          </label>
        </div>
      </div>

    </div>

    {/* Buttons */}
    <div className="pt-2 flex justify-between items-center">
      <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-gray-500 text-sm">
        ← Back
      </button>
      <button onClick={handleNext} className="btn-primary flex gap-2">
        Next Step
      </button>
    </div>
  </div>
)}



{/* STEP 3: VALET TICKET & PRICING */}
{currentStep === 3 && (
  <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-500">
    
    {/* Section Heading */}
    <div className="space-y-0">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        
        Valet Ticket & Pricing
      </h2>
      <p className="text-xs text-gray-500">Tell us how tickets are generated and how you charge guests.</p>
    </div>

    {/* Form Fields Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      
      {/* Ticket Type */}
      <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          
          Ticket Type
        </label>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="ticketType" value="pre-printed"
              checked={formData.ticketType === "pre-printed"} 
              onChange={handleChange} 
              className="w-4 h-4" 
            />
            <span className="text-sm text-gray-700">Pre-printed ticket</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="ticketType" value="system-generated"
              checked={formData.ticketType === "system-generated"} 
              onChange={handleChange} 
              className="w-4 h-4" 
            />
            <span className="text-sm text-gray-700">Ticket generated by system</span>
          </label>
        </div>
      </div>

      {/* Valet Fee Type */}
      <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
         
          Valet Fee Type
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="feeType" value="fixed"
              checked={formData.feeType === "fixed"}
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Fixed fee</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="feeType" value="hourly"
              checked={formData.feeType === "hourly"}
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Hourly</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="feeType" value="free"
              checked={formData.feeType === "free"}
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Free (complimentary)</span>
          </label>
        </div>
      </div>

      {/* Ticket Pricing */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
          Ticket Prices (AED)
          <Banknote className="w-4 h-4 text-gray-400" />
        </label>

        <textarea 
          rows={2}
          name="ticketPricing"
          placeholder="e.g. Standard: 50 AED, VIP: 100 AED..."
          value={formData.ticketPricing}
          onChange={handleChange}
          className="input"
        />

        <p className="text-xs text-gray-400 mt-1">Mention separate pricing if applicable.</p>
      </div>

      {/* VAT Handling */}
      <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          
          VAT Handling
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="vatType" value="inclusive"
              checked={formData.vatType === "inclusive"}
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Inclusive</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="vatType" value="exclusive"
              checked={formData.vatType === "exclusive"}
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Exclusive</span>
          </label>
        </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="pt-2 flex justify-between">
      <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-gray-500 text-sm">
        ← Back
      </button>

      <button onClick={handleNext} className="btn-primary">
        Next Step
      </button>
    </div>

  </div>
)}


      {/* STEP 4: DRIVERS / CVA TEAM */}
{currentStep === 4 && (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
    
    {/* Section Heading */}
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <UserCog className="w-5 h-5 text-[#ae5c83]" />
        Drivers / CVA Team
      </h2>
      <p className="text-sm text-gray-500">
        Details of drivers who will be mapped to this location.
      </p>
    </div>

    {/* Form Fields Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Number of Drivers */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
          Number of drivers
          <Users className="w-4 h-4 text-gray-400" />
        </label>

        <input 
          type="number" 
          name="driverCount"
          placeholder="e.g. 15"
          value={formData.driverCount}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] focus:border-[#ae5c83] outline-none transition-all"
        />
      </div>

      {/* Drivers List */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
          Drivers list (Employee ID & full name)
          <FileText className="w-4 h-4 text-gray-400" />
        </label>

        <textarea 
          rows={6}
          name="driverList"
          placeholder={`e.g.\n1001 - John Doe\n1002 - Jane Smith\n1003 - Ahmed Ali`}
          value={formData.driverList}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] focus:border-[#ae5c83] outline-none transition-all resize-none font-mono text-sm"
        />

        {/* Helper Note */}
        <div className="mt-2 flex gap-2 items-start p-3 bg-blue-50 text-red-700 text-sm rounded-md">
          <span className="mt-0.5">ℹ️</span>
          <p>
            If the list is too long, you may also share this as an attachment by email referencing this form.
          </p>
        </div>
      </div>

    </div>

    {/* Step Action Buttons */}
    <div className="pt-2 flex justify-between">
      <button 
        onClick={() => setCurrentStep(prev => prev - 1)}
        className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 transition-colors"
      >
        Back
      </button>

      <button 
        onClick={handleNext}
        className="flex items-center gap-2 bg-[#ae5c83] hover:bg-[#964a6d] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        Next Step
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>

  </div>
)}

        {/* STEP 5: SUPER ADMIN CONTACT */}
     {/* STEP 5: SUPER ADMIN CONTACT */}
{currentStep === 5 && (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">

    {/* Section Heading */}
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <ShieldUser className="w-5 h-5 text-[#ae5c83]" />
        Super Admin Contact
      </h2>
      <p className="text-sm text-gray-500">
        Main person responsible for valet operations & application access.
      </p>
    </div>

    {/* Full Name */}
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex gap-1">
        Full Name <span className="text-red-500">*</span>
      </label>
      <input 
        type="text"
        name="adminName"
        placeholder="e.g., Ayush Aggarwal"
        value={formData.adminName}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] outline-none transition-all"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address *
      </label>
      <input 
        type="email"
        name="adminEmail"
        placeholder="e.g., ayush@example.com"
        value={formData.adminEmail}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] outline-none transition-all"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mobile / WhatsApp Number *
      </label>
      <input 
        type="tel"
        name="adminPhone"
        placeholder="e.g., +971 52 123 4567"
        value={formData.adminPhone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] outline-none transition-all"
      />
    </div>

    {/* Training Radio */}
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
       
        Super admin will receive full application training
      </label>

      <div className="flex flex-col sm:flex-row gap-6">

        {/* Yes Option */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trainingRequired"
            value="yes"
            checked={formData.trainingRequired === "yes"}
            onChange={handleChange}
            className="text-[#ae5c83] focus:ring-[#ae5c83]"
          />
          <span className="text-sm text-black">Yes, they will be trained</span>
        </label>

        {/* No Option */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trainingRequired"
            value="no"
            checked={formData.trainingRequired === "no"}
            onChange={handleChange}
            className="text-[#ae5c83] focus:ring-[#ae5c83]"
          />
          <span className="text-sm text-black">No / different plan</span>
        </label>

      </div>
    </div>

    {/* Buttons */}
    <div className="pt-2 flex justify-between">
      <button 
        onClick={() => setCurrentStep(prev => prev - 1)}
        className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2"
      >
        ← Back
      </button>

      <button 
        onClick={handleNext}
        className="flex items-center gap-2 bg-[#ae5c83] hover:bg-[#964a6d] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        Next Step
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
)}


        

    {currentStep === 6 && (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">

    {/* Section Heading */}
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        📎 Required Documents (Upload / Email)
      </h2>
      <p className="text-sm text-gray-500">
        Attach files now or indicate how you will submit them.
      </p>
    </div>

    {/* Checklist */}
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
      <h3 className="font-medium text-gray-900">Documents Checklist</h3>

      <ul className="text-sm text-gray-700 space-y-2">
        <li>• Company logo</li>
        <li>• Client logo</li>
        <li>• VAT Certificate</li>
        <li>• Trade License</li>
      </ul>

      <p className="text-xs text-gray-500 mt-2">
        Upload now or send later via email/WhatsApp.
      </p>
    </div>

    {/* File Uploads */}
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Company Logo</label>
        <input 
          type="file" 
          name="logoCompany"
          onChange={(e) => setFormData({ ...formData, logoCompany: e.target.files[0] })}
          className="border border-gray-300 rounded-md w-full p-2 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Client Logo</label>
        <input 
          type="file" 
          name="logoClient"
          onChange={(e) => setFormData({ ...formData, logoClient: e.target.files[0] })}
          className="border border-gray-300 rounded-md w-full p-2 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">VAT Certificate</label>
        <input 
          type="file" 
          name="vatCertificate"
          onChange={(e) => setFormData({ ...formData, vatCertificate: e.target.files[0] })}
          className="border border-gray-300 rounded-md w-full p-2 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Trade License</label>
        <input 
          type="file" 
          name="tradeLicense"
          onChange={(e) => setFormData({ ...formData, tradeLicense: e.target.files[0] })}
          className="border border-gray-300 rounded-md w-full p-2 text-black"
        />
      </div>
    </div>

    {/* Text Area */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        How will you submit documents? <span className="text-red-500">*</span>
      </label>

      <textarea
        name="documentSubmitMethod"
        rows={4}
        placeholder="Example: We will email all documents in 24 hours."
        value={formData.documentSubmitMethod}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#ae5c83] outline-none transition-all"
      />
    </div>

    {/* Buttons */}
    <div className="pt-6 flex justify-between">
      <button
        onClick={() => setCurrentStep(prev => prev - 1)}
        className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 transition-colors"
      >
        ← Back
      </button>

      <button
        onClick={handleFinalSubmit}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
      >
        Finish & Submit
        <CheckCircle className="w-4 h-4" />
      </button>
    </div>

  </div>
)}


      </div>
    </div>
  );
}