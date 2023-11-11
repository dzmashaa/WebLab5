function SwapParts(){
    const part3 = document.getElementById('part3');
    const part4 = document.getElementById('part6');

    const temp = part3.innerHTML;
    part3.innerHTML = part4.innerHTML;
    part4.innerHTML = temp;
}

function CalculateArea(){
    const f_base = parseFloat(document.getElementById('first_base').value);
    const s_base = parseFloat(document.getElementById('second_base').value);
    const height = parseFloat(document.getElementById('height').value);
    if(f_base > 0 && s_base > 0 && height > 0){
      const area = 0.5*(f_base+ s_base)*height;
      document.getElementById('trapezium_area').textContent = area;
    }
    else{
      alert('Please, enter the correct values to calculate the area');
    }
}

function FindDivisors() {
  const inputElement = document.getElementById('natural');
  const inputValue = parseInt(inputElement.value);
  
  if (Number.isInteger(inputValue) && inputValue > 0) {
      let divisors = [];
      for (let i = 1; i <= inputValue; i++) {
          if (inputValue % i === 0) {
              divisors.push(i);
          }
      }
      alert('Divisors of ' + inputValue + ': ' + divisors.join(', '));
      saveCookie('Divisors', JSON.stringify(divisors));
  } else {
      alert('Please, enter a natural number');
  }
}

function saveCookie(name, value){
  document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for(let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if(name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

function displayCookie(name) {
  let value = getCookie(name);
  if(value) {
      alert(`Cookie: ${name} Value: ${value}`);
  }
}

function deleteCookies() {
  document.cookie = 'Divisors=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

window.addEventListener('load', function() {
  if(getCookie('Divisors') != null){
      displayCookie('Divisors');
      let confirmationMessage = confirm('You have cookies. Want to save them?');
      if(confirmationMessage){
          alert('You saved cookies. Please, reload the page.');
          document.getElementById('find_divisors').style.display = "none";
      } else {
          deleteCookies();
          location.reload();
      }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const convertCaseCheckbox = document.getElementById('change_case');
  const part4Element = document.querySelector('#part4 p');

  convertCaseCheckbox.addEventListener('change', convertCase);

  function convertCase() {
    const isChecked = convertCaseCheckbox.checked;
    const text = part4Element.textContent;
    const newText = isChecked ? text.replace(/\b\w/g, (match) => match.toUpperCase()) : text.toLowerCase();

    part4Element.textContent = newText;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const saveChangesRadio = document.getElementById('savechanges');
  const part4Element = document.querySelector('#part4 p');

  const storedContent = localStorage.getItem('part4Element');
  if (storedContent) {
    part4Element.textContent = storedContent;
  }

  saveChangesRadio.addEventListener('change', function() {
    if (saveChangesRadio.checked) {
      localStorage.setItem('part4Element', part4Element.textContent);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const xElement = document.getElementById('x');
  xElement.addEventListener('click', function(){   
    document.getElementById('add-images').style.display = 'block';
    document.getElementById('save-image-btn').style.display = 'none';
  });
});

function addImage() {
  document.getElementById('save-image-btn').style.display = 'block';
  const imageUrls = [
    'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
    'https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-lion-1593184780.jpg',
    'https://cdn.mos.cms.futurecdn.net/39CUYMP8vJqHAYGVzUghBX.jpg',
    'https://www.lapoflove.com/files/ecf2725e-5e93-4e51-aa10-2a22be84eeec/Lung-tumors-in-cats-1.jpg',
    'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1xTJVFt6f00ViLl0yP19yk3ph20RZK0HlkJm9NzFTFMf5eviyVlSugfo696UBMSi0jM&usqp=CAU',
    'https://cdn.mos.cms.futurecdn.net/jgp7nJeef6eLe3QRoTAeti-1200-80.jpg',
    'https://destinationksa.com/wp-content/uploads/2015/11/optimized-cute-cats-18.jpg'
  ];
  const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.style.width = '100%';
  imageElement.style.height = 'auto';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = function() { 
    deleteImage(imageElement, imageUrl); 
    deleteButton.remove();
  };
  deleteButton.classList.add('btn');

  const part4 = document.getElementById('part4');
  part4.appendChild(imageElement);
  part4.appendChild(deleteButton);

}
function saveImages() {
  const images = document.querySelectorAll('#part4 img');
  images.forEach(function(image) {
    const imageUrl = image.src;
    localStorage.setItem('image-' + imageUrl, imageUrl);
  });
}

function deleteImage(imageElement, imageUrl) {
  imageElement.remove();
  localStorage.removeItem('image-' + imageUrl);
}
