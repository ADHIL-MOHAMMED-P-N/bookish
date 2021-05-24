const rateInput = document.querySelector(".rating-input");
const rateValue = document.querySelector(".rating-value");
console.log(rateValue, rateInput);
rateInput.addEventListener("input", function() {
    var newValue = rateInput.value;
    rateValue.innerHTML = newValue;
});