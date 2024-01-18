const newParagraph = document.createElement('p');
newParagraph.innerText = 'Added with Javascript!';
document.body.appendChild(newParagraph);

// add more complex HTML
const newDiv = document.createElement('div');
newDiv.innerHTML = `<ul>
                        <li>One</li>
                        <li>Two</li>
                        <li>Three</li>
                    </ul>`;
document.body.appendChild(newDiv);

// workout
const sect = document.createElement('section');
const h2 = document.createElement('h2');
sect.appendChild(h2);
h2.textContent = 'CSE 121b';
const para = document.createElement('p');
para.textContent = 'Welcome to Javascript Language';
sect.appendChild(para);
// add section to document body
document.body.appendChild(sect);

// Add image to document
const img = document.createElement('img');
const movement = document.createElement('marquee')
movement.setAttribute('direction', 'right')
movement.setAttribute('scrollAmount', '15')
img.setAttribute('src', 'images/gif/1604502362_388647.gif');
img.setAttribute('alt', 'A walking dinosaur');

// document.body.appendChild(img);
document.body.appendChild(movement);
movement.appendChild(img);
