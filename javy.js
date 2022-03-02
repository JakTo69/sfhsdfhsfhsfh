const Gracz1 = 'fa-circle-o';
const Gracz2 = 'fa-times';
let runda = 1;
const plansza = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
const kombinacje = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function wybierz(event) {
    const { x, y } = event.target.dataset;
    const tura = runda % 2 === 0 ? Gracz2 : Gracz1;
    if (plansza[x][y] !== '') return;
    event.target.classList.add(tura);
    plansza[x][y] = tura;
    runda++;

    console.log(check());
}

function check() {
    const wynik = plansza.reduce((total, x) => total.concat(x));
    let zwyciezca = null;
    let ruch = {
        'fa-times': [],
        'fa-circle-o': []
    };
    wynik.forEach((pole, index) => ruch[pole] ? ruch[pole].push(index) : null);
    kombinacje.forEach(kombinacje => {
        if (kombinacje.every(index => ruch[Gracz1].indexOf(index) > -1)) {
          zwyciezca = 'Gracz X wygrał';
        }
        if (kombinacje.every(index => ruch[Gracz2].indexOf(index) > -1)) {
          zwyciezca = 'Gracz O wygrał';
        }
    });

    return zwyciezca;
}