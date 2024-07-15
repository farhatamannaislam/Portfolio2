
const selectService = document.querySelector('#selector');

function getOption() {

    price = selectService.value;
    document.querySelector('.price').textContent = price;
}

function getDiscount()
{

    discount= selectService.value;
    if(discount >= 100)
    document.querySelector('.discount').textContent = discount - discount * 0.1;
    
}

