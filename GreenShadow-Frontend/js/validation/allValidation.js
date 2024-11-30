const regexName = /^[A-Za-z]{3,}$/;
const regexTel = /^\d{10}$/;
const regexAddress = /^[A-Za-z]{3,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

const fieldRegex = /^[A-Za-z]+( [A-Za-z]+)*$/; 
const pointRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
const locationRegex = /^\d+(\.\d+)?$/;
const sizeRegex = /^\d+(\.\d+)?$/;

const cropRegex = /^[a-zA-Z0-9\s-]+$/; 

const licenseRegex = /^[A-Z]{2,3}[-\s]\d{4}$/;
