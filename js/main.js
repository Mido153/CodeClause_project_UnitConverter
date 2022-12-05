

// open nav and close 
const navBtn = document.querySelector('.header .nav-toggeler'),
      navBar = document.querySelector('.header .nav');

navBtn.onclick = () => {
    navBtn.classList.toggle('fa-close');
    navBar.classList.toggle('active');
}




window.onscroll = () => {
    
    // remove active menu on scroll
    navBar.classList.remove('active');
    navBtn.classList.remove('fa-close');
    navBtn.classList.add('fa-bars');


    // header shadow on scroll
    const header = document.querySelector('.header');
    if(this.scrollY >= 100) {
        header.classList.add('shadow');
    }
    else {
        header.classList.remove('shadow');
    }


    // active section 
    const sections = document.querySelectorAll('section'),
    scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionTop = current.offsetTop - 50,
              sectionHeight = current.offsetHeight ,
              sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.add('active')
        }
        else {
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.remove('active')

        }
    })

}



// our units list 
const units = 
{
    lengthBox:[
        'kilometer (km)',
        'meter (m)',
        'centimeter (cm)',
        'millimeter (mm)',
        'micrometer (µm)',
        'nanometer (nm)',
        'mile (mi)',
        'yard (yd)',
        'foot (ft)',
        'inch (in)',
        'nautical mile (nmi)'
    ],

    areaBox: [
        'Square Kilometer (Km²)',
        'Square meter (m²)',
        'Square mile (mi2)',
        'Square yard (yd2)',
        'Square foot (ft2)',
        'Square inch (in2)',
        'Hectare (ha)',
        'Acre (ac)',
    ],
    volumeBox: [
        'Us liquid gallon',
        'Us liquid quart',
        'Us liquid pint',
        'Us legal cup',
        'us Fluid ounce',
        'us table spoon',
        'us tea spoon',
        'cubic meter',
        'liter',
        'milliliter',
        'imperial gallon',
        'imperial quart',
        'imperial pint',
        'imperial cub',
        'uk Fluid ounce (ft2)',
        'imperial table spoon',
        'imperial tea spoon',
        'cubic foot (ft³)',
        'cubic inch (in³)',
    ],

    speedBox: [
        'mile/hour',
        'foot/second',
        'meter/second',
        'kilometer/hour',
        'kilometer/second',
        
    ],
    weightBox: [
        'tonne',
        'kilo gram',
        'gram',
        'milligram',
        'micro gram',
        'imperial ton',
        'us ton',
        'stone',
        'pound',
        'ounce',
       
    ],
    temperatureBox: [
        'degree celsius',
        'fahrenheit',
        'kelvin',
        
    ],
    powerBox: [
        'joule',
        'kilojoule',
        'gram calorie',
        'kilo calorie',
        'watt hour',
        'kilowatt hour',
        'electronvolt',
        'british thermal unit',
        'us therm',
        'foot pound',
     
    ],
    pressureBox: [
        'atmosphere',
        'bar',
        'pascal',
        'pound/square inch',
        'torr',
        
    ],
    timeBox: [
        'nanosecond',
        'microsecond',
        'millisecond',
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'calender year',
        'decade',
        'century',
        
    ],
}




// function to create selects lists dynamically 
function create_select (args){
    
    // create select element and its id
    let fromSelect = document.createElement('select'),
        img = document.createElement('img'),
        toSelect = document.createElement('select');
    

    fromSelect.setAttribute('id' , 'inputType');
    img.setAttribute('src' , 'img/double-arrow.png');
    toSelect.setAttribute('id' , 'resultType');

    
    // add options to select
    let fromOptions = `<option selected disabled>From Unit</option>`;
    for(let i = 0; i < args.length; i++){
        fromOptions += `<option value="${args[i]}"> ${args[i]} </option>`
    }

    let toOptions = `<option selected disabled>To Unit</option>`;
    for(let i = 0; i < args.length; i++){

        toOptions += `<option value="${args[i]}"> ${args[i]} </option>`
    }

    // insert the options to select list
    fromSelect.insertAdjacentHTML("afterbegin" , fromOptions);
    toSelect.insertAdjacentHTML("afterbegin" , toOptions);
    
    // add the element to page 
    const row  = document.getElementById('select');
    

    if(row.childElementCount >= 3){

        row.removeChild(row.querySelector('.converter #inputType'));
        row.removeChild(row.querySelector('.converter #resultType'));
        row.removeChild(row.querySelector('img'));

        row.appendChild(fromSelect);
        row.appendChild(img);
        row.appendChild(toSelect);

    }else {
        row.appendChild(fromSelect);
        row.appendChild(img);
        row.appendChild(toSelect);
    }
  
}





// open the converter content based on the unit type 
const UnitTypeList = document.querySelectorAll('.converter .row .box'),
      converter = document.querySelector('.converter .converter-content'),
      body = document.querySelector('body'),
      close = document.querySelector('.converter .container .close');

// close the converter  
close.onclick = () => {
    converter.classList.remove('active')
    body.classList.remove('pop-up');
}

var inputTypeValue , resultTypeValue ;
UnitTypeList.forEach(unit => {
    unit.onclick = () => {

        // show the content section 
        converter.classList.add('active')
        body.classList.add('pop-up');

        // call the create_select function
        create_select(units[unit.id]);

        // get the inputType and  resultType values 
        let inputType = document.getElementById('inputType');
        let resultType = document.getElementById('resultType');
        let input = document.getElementById('inputNumber');
        let result = document.getElementById('resultNumber');
        let calcBtn = document.getElementById('calcBtn');

        // initial values
        inputTypeValue = inputType.value;
        resultTypeValue = resultType.value;
        
        if(unit.id === 'lengthBox'){

            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                length_converter(input , result , inputTypeValue , resultTypeValue);
            }

        }
        else if(unit.id === 'areaBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                area_converter(input , result , inputTypeValue , resultTypeValue);
            }
        }
        else if(unit.id === 'volumeBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                volume_converter(input , result , inputTypeValue , resultTypeValue);
            }
        }
        else if(unit.id === 'speedBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                speed_converter(input , result , inputTypeValue , resultTypeValue);
            }
        }
        else if(unit.id === 'weightBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                weight_converter(input , result , inputTypeValue , resultTypeValue);
            }

        }
        else if(unit.id === 'temperatureBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                temperature_converter(input , result , inputTypeValue , resultTypeValue);
            }
        }
        else if(unit.id === 'powerBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                power_converter(input , result , inputTypeValue , resultTypeValue);
            }        
        }
        else if(unit.id === 'pressureBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                pressure_converter(input , result , inputTypeValue , resultTypeValue);
            } 
        }
        else if(unit.id === 'timeBox'){
            calcBtn.onclick = () => {
                inputTypeValue =  inputType.onchange = inputType.value;
                resultTypeValue =  resultType.onchange = resultType.value;
                time_converter(input , result , inputTypeValue , resultTypeValue);
            }

        }
        else {
            alert('something wrong with the unit type....');
        }

    }
})








// function for length converter 
function length_converter(input , result , inputTypeValue , resultTypeValue){
    

    if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'meter (m)')
        result.value = input.value * 1000; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 100000; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 1e+6; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1e+9; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1e+12; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1.609; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 1094; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 3281; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 39370; 
    else if(inputTypeValue === 'kilometer (km)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1.852; 
    

    if(inputTypeValue === 'meter (m)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 1000; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'meter (m)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 100; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 1000; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1e+6; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1e+9; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1609; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 1.094; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 3.281; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 39.37; 
    else if(inputTypeValue === 'meter (m)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1852;


    if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 100000; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 100; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 10; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 10000; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1e+7; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 160900; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 91.44; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'foot (ft)')
        result.value = input.value / 30.48; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'inch (in)')
        result.value = input.value / 2.54; 
    else if(inputTypeValue === 'centimeter (cm)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 185200;


    if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 1e+6; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 1000; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value / 10; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1000; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1e+6; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1.609e+6; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'yard (yd)')
        result.value = input.value / 914.4; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'foot (ft)')
        result.value = input.value / 304.8; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'inch (in)')
        result.value = input.value / 25.4; 
    else if(inputTypeValue === 'millimeter (mm)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1.852e+6;



    if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 1e+9; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 1e+6; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value / 10000; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value/ 1000; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1000; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1.609e+9; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'yard (yd)')
        result.value = input.value / 914400; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'foot (ft)')
        result.value = input.value / 304800; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'inch (in)')
        result.value = input.value / 25400; 
    else if(inputTypeValue === 'micrometer (µm)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1.852e+9;

    
    if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 1e+12; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 1e+9; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value / 1e+7; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value/ 1e+6; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value / 1000; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1.609e+12; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'yard (yd)')
        result.value = input.value / 9.144e+8; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'foot (ft)')
        result.value = input.value / 3.048e+8; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'inch (in)')
        result.value = input.value / 2.54e+7; 
    else if(inputTypeValue === 'nanometer (nm)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1.852e+12;

    
    if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value * 1.609; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'meter (m)')
        result.value = input.value * 1609; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 160900; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 1.609e+6; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1.609e+9; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1.609e+12; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'mile (mi)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 1760; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 5280; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 63360; 
    else if(inputTypeValue === 'mile (mi)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 1.151;

    
    if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 1094; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 1.094; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 91.44; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 914.4; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 914400; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 9.144e+8; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 1760; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 3; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 36; 
    else if(inputTypeValue === 'yard (yd)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 2025;

    
    if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 3281; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 3.281; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 30.48; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 304.8; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 304800; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 3.048e+8; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 5280; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'yard (yd)')
        result.value = input.value / 3; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 12; 
    else if(inputTypeValue === 'foot (ft)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 6076;

    
    if(inputTypeValue === 'inch (in)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value / 39370; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'meter (m)')
        result.value = input.value / 39.37; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 2.54; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 25.4; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 25400; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 2.54e+7; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'mile (mi)')
        result.value = input.value / 63360; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'yard (yd)')
        result.value = input.value / 36; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'foot (ft)')
        result.value = input.value / 12; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 1; 
    else if(inputTypeValue === 'inch (in)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value / 72910;

    
    if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'kilometer (km)')
        result.value = input.value * 1.852; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'meter (m)')
        result.value = input.value * 1852; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'centimeter (cm)')
        result.value = input.value * 185200; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'millimeter (mm)')
        result.value = input.value * 1.852e+6; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'micrometer (µm)')
        result.value = input.value * 1.852e+9; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'nanometer (nm)')
        result.value = input.value * 1.852e+12; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'mile (mi)')
        result.value = input.value * 1.151; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'yard (yd)')
        result.value = input.value * 2025; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'foot (ft)')
        result.value = input.value * 6076; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'inch (in)')
        result.value = input.value * 72910; 
    else if(inputTypeValue === 'nautical mile (nmi)' && resultTypeValue === 'nautical mile (nmi)')
        result.value = input.value * 1;

    


}

// function for speed converter 
function speed_converter(input , result , inputTypeValue , resultTypeValue){


    if(inputTypeValue === 'mile/hour' && resultTypeValue === 'mile/hour')
        result.value = input.value * 1;
    else if(inputTypeValue === 'mile/hour' && resultTypeValue === 'foot/second')
        result.value = input.value * 1.467;
    else if(inputTypeValue === 'mile/hour' && resultTypeValue === 'meter/second')
        result.value = input.value / 2.237;
    else if(inputTypeValue === 'mile/hour' && resultTypeValue === 'kilometer/hour')
        result.value = input.value * 1.609;
    else if(inputTypeValue === 'mile/hour' && resultTypeValue === 'kilometer/second')
        result.value = input.value / 2237;

        
    if(inputTypeValue === 'foot/second' && resultTypeValue === 'mile/hour')
        result.value = input.value / 1.467;
    else if(inputTypeValue === 'foot/second' && resultTypeValue === 'foot/second')
        result.value = input.value * 1;
    else if(inputTypeValue === 'foot/second' && resultTypeValue === 'meter/second')
        result.value = input.value / 3.281;
    else if(inputTypeValue === 'foot/second' && resultTypeValue === 'kilometer/hour')
        result.value = input.value * 1.097;
    else if(inputTypeValue === 'foot/second' && resultTypeValue === 'kilometer/second')
        result.value = input.value / 3281;

        
    if(inputTypeValue === 'meter/second' && resultTypeValue === 'mile/hour')
        result.value = input.value * 2.237;
    else if(inputTypeValue === 'meter/second' && resultTypeValue === 'foot/second')
        result.value = input.value * 3.281;
    else if(inputTypeValue === 'meter/second' && resultTypeValue === 'meter/second')
        result.value = input.value * 1;
    else if(inputTypeValue === 'meter/second' && resultTypeValue === 'kilometer/hour')
        result.value = input.value * 3.6;
    else if(inputTypeValue === 'meter/second' && resultTypeValue === 'kilometer/second')
        result.value = input.value / 1000;

        
    if(inputTypeValue === 'kilometer/hour' && resultTypeValue === 'mile/hour')
        result.value = input.value / 1.609;
    else if(inputTypeValue === 'kilometer/hour' && resultTypeValue === 'foot/second')
        result.value = input.value / 1.097;
    else if(inputTypeValue === 'kilometer/hour' && resultTypeValue === 'meter/second')
        result.value = input.value / 3.6;
    else if(inputTypeValue === 'kilometer/hour' && resultTypeValue === 'kilometer/hour')
        result.value = input.value * 1;
    else if(inputTypeValue === 'kilometer/hour' && resultTypeValue === 'kilometer/second')
        result.value = input.value / 3600;

        
    if(inputTypeValue === 'kilometer/second' && resultTypeValue === 'mile/hour')
        result.value = input.value * 2237;
    else if(inputTypeValue === 'kilometer/second' && resultTypeValue === 'foot/second')
        result.value = input.value * 3281;
    else if(inputTypeValue === 'kilometer/second' && resultTypeValue === 'meter/second')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'kilometer/second' && resultTypeValue === 'kilometer/hour')
        result.value = input.value * 3600;
    else if(inputTypeValue === 'kilometer/second' && resultTypeValue === 'kilometer/second')
        result.value = input.value * 1;



}

// function for temperature converter 
function temperature_converter(input , result , inputTypeValue , resultTypeValue){


    if(inputTypeValue === 'degree celsius' && resultTypeValue === 'degree celsius')
        result.value = input.value * 1;
    else if(inputTypeValue === 'degree celsius' && resultTypeValue === 'fahrenheit')
        result.value = ( input.value * 1.8) + 32;
    else if(inputTypeValue === 'degree celsius' && resultTypeValue === 'kelvin')
        result.value = Number(input.value) + 273.15;
   

    if(inputTypeValue === 'fahrenheit' && resultTypeValue === 'degree celsius')
        result.value = (input.value - 32) / 1.8;
    else if(inputTypeValue === 'fahrenheit' && resultTypeValue === 'fahrenheit')
        result.value = input.value * 1;
    else if(inputTypeValue === 'fahrenheit' && resultTypeValue === 'kelvin')
        result.value = ((input.value - 32) / 1.8) + 273.15;


    if(inputTypeValue === 'kelvin' && resultTypeValue === 'degree celsius')
        result.value = input.value - 273.15;
    else if(inputTypeValue === 'kelvin' && resultTypeValue === 'fahrenheit')
        result.value = ((input.value - 273.15) * 1.8) + 32;
    else if(inputTypeValue === 'kelvin' && resultTypeValue === 'kelvin')
        result.value = input.value * 1;
}

// function for time converter 
function time_converter(input , result , inputTypeValue , resultTypeValue){
    

        if(inputTypeValue === 'nanosecond' && resultTypeValue === 'nanosecond')
            result.value = input.value * 1;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'microsecond')
            result.value = input.value / 1000;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'millisecond')
            result.value = input.value / 1e+6;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'second')
            result.value = input.value / 1e+9;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'minute')
            result.value = input.value / 6e+10;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'hour')
            result.value = input.value / 3.6e+12;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'day')
            result.value = input.value / 8.64e+13;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'week')
            result.value = input.value / 6.048e+14;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'month')
            result.value = input.value / 2.628e+15;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'calender year')
            result.value = input.value / 3.154e+16;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'decade')
            result.value = input.value / 3.154e+17;
        else if ( inputTypeValue === 'nanosecond' && resultTypeValue === 'century')
            result.value = input.value / 3.154e+18;


        if( inputTypeValue === 'microsecond' && resultTypeValue ===  'microsecond')
            result.value = input.value * 1 ;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'nanosecond')
            result.value = input.value * 1000;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'millisecond')
            result.value = input.value / 1000;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'second')
            result.value = input.value / 1e+6;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'minute')
            result.value = input.value /  6e+7;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'hour')
            result.value = input.value / 3.6e+9;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'day')
            result.value = input.value / 8.64e+10;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'week')
            result.value = input.value / 6.048e+11;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'month')
            result.value = input.value / 2.628e+12;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'calender year')
            result.value = input.value / 3.154e+13;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'decade')
            result.value = input.value / 3.154e+14;
        else if ( inputTypeValue === 'microsecond' && resultTypeValue === 'century')
            result.value = input.value / 3.154e+15;



        if ( inputTypeValue === 'millisecond' && resultTypeValue === 'millisecond')
            result.value = input.value * 1;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'microsecond')
            result.value = input.value * 1000 ;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'nanosecond')
            result.value = input.value * 1e+6;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'second')
            result.value = input.value / 1000;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'minute')
            result.value = input.value / 60000;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'hour')
            result.value = input.value / 3.6e+6;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'day')
            result.value = input.value / 8.64e+7;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'week')
            result.value = input.value / 6.048e+8;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'month')
            result.value = input.value / 2.628e+9;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'calender year')
            result.value = input.value / 3.154e+10;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'decade')
            result.value = input.value / 3.154e+11;
        else if (inputTypeValue === 'millisecond' && resultTypeValue === 'century')
            result.value = input.value / 3.154e+12;



        if (inputTypeValue === 'second' && resultTypeValue === 'second')
            result.value = input.value * 1;
        else if (inputTypeValue === 'second' && resultTypeValue === 'microsecond')
            result.value = input.value * 1e+6 ;
        else if (inputTypeValue === 'second' && resultTypeValue === 'nanosecond')
            result.value = input.value * 1e+9;
        else if (inputTypeValue === 'second' && resultTypeValue === 'millisecond')
            result.value = input.value * 1000;
        else if (inputTypeValue === 'second' && resultTypeValue === 'minute')
            result.value = input.value / 60;
        else if (inputTypeValue === 'second' && resultTypeValue === 'hour')
            result.value = input.value / 3600;
        else if (inputTypeValue === 'second' && resultTypeValue === 'day')
            result.value = input.value / 86400;
        else if (inputTypeValue === 'second' && resultTypeValue === 'week')
            result.value = input.value / 604800;
        else if (inputTypeValue === 'second' && resultTypeValue === 'month')
            result.value = input.value / 2.628e+6;
        else if (inputTypeValue === 'second' && resultTypeValue === 'calender year')
            result.value = input.value / 3.154e+7;
        else if (inputTypeValue === 'second' && resultTypeValue === 'decade')
            result.value = input.value / 3.154e+8;
        else if (inputTypeValue === 'second' && resultTypeValue === 'century')
            result.value = input.value / 3.154e+9;



        if(inputTypeValue === 'minute' && resultTypeValue === 'minute')
            result.value = input.value * 1;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'microsecond')
            result.value = input.value * 6e+7 ;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'nanosecond')
            result.value = input.value * 6e+10;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'millisecond')
            result.value = input.value * 60000;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'second')
            result.value = input.value * 60;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'hour')
            result.value = input.value / 60;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'day')
            result.value = input.value / 1440;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'week')
            result.value = input.value / 10080;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'month')
            result.value = input.value / 43800;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'calender year')
            result.value = input.value / 525600;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'decade')
            result.value = input.value / 5.256e+6;
        else if (inputTypeValue === 'minute' && resultTypeValue === 'century')
            result.value = input.value / 5.256e+7;


        if(inputTypeValue === 'hour' && resultTypeValue === 'hour')
            result.value = input.value * 1;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'microsecond')
            result.value = input.value * 3.6e+9;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'nanosecond')
            result.value = input.value * 3.6e+12;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'millisecond')
            result.value = input.value * 3.6e+6;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'second')
            result.value = input.value * 3600;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'minute')
            result.value = input.value * 60;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'day')
            result.value = input.value / 24;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'week')
            result.value = input.value / 168;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'month')
            result.value = input.value / 730;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'calender year')
            result.value = input.value / 8760;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'decade')
            result.value = input.value / 87600;
        else if(inputTypeValue === 'hour' && resultTypeValue === 'century')
            result.value = input.value / 876000;


        if(inputTypeValue === 'day' && resultTypeValue === 'day')
            result.value = input.value * 1;
        else if(inputTypeValue === 'day' && resultTypeValue === 'microsecond')
            result.value = input.value * 8.64e+10;
        else if(inputTypeValue === 'day' && resultTypeValue === 'nanosecond')
            result.value = input.value * 8.64e+13;
        else if(inputTypeValue === 'day' && resultTypeValue === 'millisecond')
            result.value = input.value * 8.64e+7;
        else if(inputTypeValue === 'day' && resultTypeValue === 'second')
            result.value = input.value * 86400;
        else if(inputTypeValue === 'day' && resultTypeValue === 'minute')
            result.value = input.value * 1440;
        else if(inputTypeValue === 'day' && resultTypeValue === 'hour')
            result.value = input.value * 24;
        else if(inputTypeValue === 'day' && resultTypeValue === 'week')
            result.value = input.value / 7;
        else if(inputTypeValue === 'day' && resultTypeValue === 'month')
            result.value = input.value / 30.417;
        else if(inputTypeValue === 'day' && resultTypeValue === 'calender year')
            result.value = input.value / 365;
        else if(inputTypeValue === 'day' && resultTypeValue === 'decade')
            result.value = input.value / 3650;
        else if(inputTypeValue === 'day' && resultTypeValue === 'century')
            result.value = input.value / 36500;


        if(inputTypeValue === 'week' && resultTypeValue === 'week')
            result.value = input.value * 1;
        else if(inputTypeValue === 'week' && resultTypeValue === 'microsecond')
            result.value = input.value * 6.048e+11;
        else if(inputTypeValue === 'week' && resultTypeValue === 'nanosecond')
            result.value = input.value * 6.048e+14;
        else if(inputTypeValue === 'week' && resultTypeValue === 'millisecond')
            result.value = input.value * 6.048e+8;
        else if(inputTypeValue === 'week' && resultTypeValue === 'second')
            result.value = input.value * 604800;
        else if(inputTypeValue === 'week' && resultTypeValue === 'minute')
            result.value = input.value * 10080;
        else if(inputTypeValue === 'week' && resultTypeValue === 'hour')
            result.value = input.value * 168;
        else if(inputTypeValue === 'week' && resultTypeValue === 'day')
            result.value = input.value * 7;
        else if(inputTypeValue === 'week' && resultTypeValue === 'month')
            result.value = input.value / 4.345;
        else if(inputTypeValue === 'week' && resultTypeValue === 'calender year')
            result.value = input.value / 52.143;
        else if(inputTypeValue === 'week' && resultTypeValue === 'decade')
            result.value = input.value / 521.4;
        else if(inputTypeValue === 'week' && resultTypeValue === 'century')
            result.value = input.value / 5214;


        if(inputTypeValue === 'month' && resultTypeValue === 'month')
            result.value = input.value * 1;
        else if(inputTypeValue === 'month' && resultTypeValue === 'microsecond')
            result.value = input.value * 2.628e+12;
        else if(inputTypeValue === 'month' && resultTypeValue === 'nanosecond')
            result.value = input.value * 2.628e+15;
        else if(inputTypeValue === 'month' && resultTypeValue === 'millisecond')
            result.value = input.value * 2.628e+9;
        else if(inputTypeValue === 'month' && resultTypeValue === 'second')
            result.value = input.value * 2.628e+6;
        else if(inputTypeValue === 'month' && resultTypeValue === 'minute')
            result.value = input.value * 43800;
        else if(inputTypeValue === 'month' && resultTypeValue === 'hour')
            result.value = input.value * 730;
        else if(inputTypeValue === 'month' && resultTypeValue === 'day')
            result.value = input.value * 30.417;
        else if(inputTypeValue === 'month' && resultTypeValue === 'week')
            result.value = input.value * 4.345;
        else if(inputTypeValue === 'month' && resultTypeValue === 'calender year')
            result.value = input.value / 12;
        else if(inputTypeValue === 'month' && resultTypeValue === 'decade')
            result.value = input.value / 120;
        else if(inputTypeValue === 'month' && resultTypeValue === 'century')
            result.value = input.value / 1200;


        if(inputTypeValue === 'calender year' && resultTypeValue === 'calender year')
            result.value = input.value * 1;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'microsecond')
            result.value = input.value * 3.154e+13;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'nanosecond')
            result.value = input.value * 3.154e+16;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'millisecond')
            result.value = input.value * 3.154e+10;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'second')
            result.value = input.value * 3.154e+7;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'minute')
            result.value = input.value * 525600;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'hour')
            result.value = input.value * 8760;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'day')
            result.value = input.value * 365;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'week')
            result.value = input.value * 52.143;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'month')
            result.value = input.value * 12;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'decade')
            result.value = input.value / 10;
        else if(inputTypeValue === 'calender year' && resultTypeValue === 'century')
            result.value = input.value / 100;


        if(inputTypeValue === 'decade' && resultTypeValue === 'decade')
            result.value = input.value * 1;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'microsecond')
            result.value = input.value * 3.154e+14;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'nanosecond')
            result.value = input.value * 3.154e+17;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'millisecond')
            result.value = input.value * 3.154e+11;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'second')
            result.value = input.value * 3.154e+8;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'minute')
            result.value = input.value * 5.256e+6;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'hour')
            result.value = input.value * 87600;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'day')
            result.value = input.value * 3650;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'week')
            result.value = input.value * 521.4;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'month')
            result.value = input.value * 120;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'calender year')
            result.value = input.value * 10;
        else if(inputTypeValue === 'decade' && resultTypeValue === 'century')
            result.value = input.value / 10;


        if(inputTypeValue === 'century' && resultTypeValue === 'century')
            result.value = input.value * 1;
        else if(inputTypeValue === 'century' && resultTypeValue === 'microsecond')
            result.value = input.value * 3.154e+15;
        else if(inputTypeValue === 'century' && resultTypeValue === 'nanosecond')
            result.value = input.value * 3.154e+18;
        else if(inputTypeValue === 'century' && resultTypeValue === 'millisecond')
            result.value = input.value * 3.154e+12;
        else if(inputTypeValue === 'century' && resultTypeValue === 'second')
            result.value = input.value * 3.154e+9;
        else if(inputTypeValue === 'century' && resultTypeValue === 'minute')
            result.value = input.value * 5.256e+7;
        else if(inputTypeValue === 'century' && resultTypeValue === 'hour')
            result.value = input.value * 876000;
        else if(inputTypeValue === 'century' && resultTypeValue === 'day')
            result.value = input.value * 36500;
        else if(inputTypeValue === 'century' && resultTypeValue === 'week')
            result.value = input.value * 5214;
        else if(inputTypeValue === 'century' && resultTypeValue === 'month')
            result.value = input.value * 1200;
        else if(inputTypeValue === 'century' && resultTypeValue === 'calender year')
            result.value = input.value * 100;
        else if(inputTypeValue === 'century' && resultTypeValue === 'decade')
            result.value = input.value * 10;

}

// function for power converter 
function power_converter(input , result , inputTypeValue , resultTypeValue){

     
    if(inputTypeValue === 'joule' && resultTypeValue === 'joule')
        result.value = input.value * 1;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'kilojoule')
        result.value = input.value / 1000 ;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'gram calorie')
        result.value = input.value / 4.184;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 4184;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'watt hour')
        result.value = input.value / 3600;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 3.6e+6;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'electronvolt')
        result.value = input.value * 6.242e+18;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'british thermal unit')
        result.value = input.value / 1055;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'us therm')
        result.value = input.value / 1.055e+8;
    else if(inputTypeValue === 'joule' && resultTypeValue === 'foot pound')
        result.value = input.value / 1.356;

        
    if(inputTypeValue === 'kilojoule' && resultTypeValue === 'kilojoule')
        result.value = input.value * 1;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'joule')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'gram calorie')
        result.value = input.value * 239;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 4.184;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'watt hour')
        result.value = input.value / 3.6;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 3600;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'electronvolt')
        result.value = input.value * 6.242e+21;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'british thermal unit')
        result.value = input.value / 1.055;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'us therm')
        result.value = input.value / 105500;
    else if(inputTypeValue === 'kilojoule' && resultTypeValue === 'foot pound')
        result.value = input.value * 737.6;


    if(inputTypeValue === 'gram calorie' && resultTypeValue === 'gram calorie')
        result.value = input.value * 1;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'joule')
        result.value = input.value * 4.184;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'kilojoule')
        result.value = input.value / 239;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'watt hour')
        result.value = input.value / 860.4;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 860400;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'electronvolt')
        result.value = input.value * 2.611e+19;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'british thermal unit')
        result.value = input.value / 252.2;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'us therm')
        result.value = input.value / 2.521e+7;
    else if(inputTypeValue === 'gram calorie' && resultTypeValue === 'foot pound')
        result.value = input.value * 3.086;


    if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'kilo calorie')
        result.value = input.value * 1;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'joule')
        result.value = input.value * 4184;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'gram calorie')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'kilojoule')
        result.value = input.value * 4.184;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'watt hour')
        result.value = input.value * 1.162;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 860.4;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'electronvolt')
        result.value = input.value * 2.611e+22;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'british thermal unit')
        result.value = input.value * 3.966;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'us therm')
        result.value = input.value / 25210;
    else if(inputTypeValue === 'kilo calorie' && resultTypeValue === 'foot pound')
        result.value = input.value * 3086;


    if(inputTypeValue === 'watt hour' && resultTypeValue === 'watt hour')
        result.value = input.value * 1;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'joule')
        result.value = input.value * 3600;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'gram calorie')
        result.value = input.value * 860.4;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 1.162;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'kilojoule')
        result.value = input.value * 3.6;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'electronvolt')
        result.value = input.value * 2.247e+22;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'british thermal unit')
        result.value = input.value * 3.412;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'us therm')
        result.value = input.value / 29300;
    else if(inputTypeValue === 'watt hour' && resultTypeValue === 'foot pound')
        result.value = input.value * 2655;


    if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'kilowatt hour')
        result.value = input.value * 1;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'joule')
        result.value = input.value * 3.6e+6;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'gram calorie')
        result.value = input.value * 860400;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'kilo calorie')
        result.value = input.value * 860.4;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'watt hour')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'kilojoule')
        result.value = input.value * 3600;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'electronvolt')
        result.value = input.value * 2.247e+25;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'british thermal unit')
        result.value = input.value * 3412;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'us therm')
        result.value = input.value / 29.3;
    else if(inputTypeValue === 'kilowatt hour' && resultTypeValue === 'foot pound')
        result.value = input.value * 2.655e+6;


    if(inputTypeValue === 'electronvolt' && resultTypeValue === 'electronvolt')
        result.value = input.value * 1;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'joule')
        result.value = input.value / 6.242e+18;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'gram calorie')
        result.value = input.value / 2.611e+19;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 2.611e+22;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'watt hour')
        result.value = input.value / 2.247e+22;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 2.247e+25;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'kilojoule')
        result.value = input.value / 6.242e+21;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'british thermal unit')
        result.value = input.value / 6.585e+21;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'us therm')
        result.value = input.value / 6.584e+26;
    else if(inputTypeValue === 'electronvolt' && resultTypeValue === 'foot pound')
        result.value = input.value / 8.462e+18;


    if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'british thermal unit')
        result.value = input.value * 1;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'joule')
        result.value = input.value * 1055;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'gram calorie')
        result.value = input.value * 252.2;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 3.966;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'watt hour')
        result.value = input.value / 3.412;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 3412;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'electronvolt')
        result.value = input.value * 6.585e+21;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'kilojoule')
        result.value = input.value * 1.055;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'us therm')
        result.value = input.value / 99980;
    else if(inputTypeValue === 'british thermal unit' && resultTypeValue === 'foot pound')
        result.value = input.value * 778.2;


    if(inputTypeValue === 'us therm' && resultTypeValue === 'us therm')
        result.value = input.value * 1;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'joule')
        result.value = input.value * 1.055e+8;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'gram calorie')
        result.value = input.value * 2.521e+7;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'kilo calorie')
        result.value = input.value * 25210;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'watt hour')
        result.value = input.value * 29300;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'kilowatt hour')
        result.value = input.value * 29.3;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'electronvolt')
        result.value = input.value * 6.584e+26;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'british thermal unit')
        result.value = input.value * 99980;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'kilojoule')
        result.value = input.value * 105500;
    else if(inputTypeValue === 'us therm' && resultTypeValue === 'foot pound')
        result.value = input.value * 7.78e+7;


    if(inputTypeValue === 'foot pound' && resultTypeValue === 'foot pound')
        result.value = input.value * 1;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'joule')
        result.value = input.value * 1.356;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'gram calorie')
        result.value = input.value / 3.086;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'kilo calorie')
        result.value = input.value / 3086;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'watt hour')
        result.value = input.value / 2655;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'kilowatt hour')
        result.value = input.value / 2.655e+6;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'electronvolt')
        result.value = input.value * 8.462e+18;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'british thermal unit')
        result.value = input.value / 778.2;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'us therm')
        result.value = input.value / 7.78e+7;
    else if(inputTypeValue === 'foot pound' && resultTypeValue === 'kilojoule')
        result.value = input.value / 737.6;


}

// function for volume converter 
function volume_converter(input , result , inputTypeValue , resultTypeValue){





    if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 4;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 8;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 15.773;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 128;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'us table spoon')
        result.value = input.value * 256;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 768;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 264.2;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'liter')
        result.value = input.value * 3.785;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'milliliter')
        result.value = input.value * 3785;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 1.201;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial quart')
        result.value = input.value * 3.331;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial pint')
        result.value = input.value * 6.661;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial cub')
        result.value = input.value * 13.323;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 133.2;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 213.2;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 639.5;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 7.48;
    else if(inputTypeValue === 'Us liquid gallon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 231;


    if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 4;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 2;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 3.943;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 32;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'us table spoon')
        result.value = input.value * 64;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 192;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'cubic meter')
        result.value = input.value / 1057;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'liter')
        result.value = input.value / 1.057;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'milliliter')
        result.value = input.value * 946.4;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 4.804;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial quart')
        result.value = input.value / 1.201;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial pint')
        result.value = input.value * 1.665;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial cub')
        result.value = input.value * 3.331;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 33.307;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 53.291;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 159.9;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 29.922;
    else if(inputTypeValue === 'Us liquid quart' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 57.75;


    if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 2;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 8;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 1.972;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 16;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'us table spoon')
        result.value = input.value * 32;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 96;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'cubic meter')
        result.value = input.value / 2113;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'liter')
        result.value = input.value / 2.113;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'milliliter')
        result.value = input.value * 473.2;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 9.608;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial quart')
        result.value = input.value / 2.402;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial pint')
        result.value = input.value / 1.201;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial cub')
        result.value = input.value * 1.665;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 16.653;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 26.646;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 79.937;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 59.844;
    else if(inputTypeValue === 'Us liquid pint' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 28.875;


    if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 3.943;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 1.972;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 15.772;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 8.115;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'us table spoon')
        result.value = input.value * 16.231;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 48.692;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'cubic meter')
        result.value = input.value / 4167;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'liter')
        result.value = input.value / 4.167;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'milliliter')
        result.value = input.value * 240;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 18.942;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial quart')
        result.value = input.value / 4.736;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial pint')
        result.value = input.value / 2.368;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial cub')
        result.value = input.value / 1.184;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 8.447;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 13.515;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 40.545;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 118;
    else if(inputTypeValue === 'Us legal cup' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 14.646;


    if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 1;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 32;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 16;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 8.115;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 128;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'us table spoon')
        result.value = input.value * 2;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 6;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'cubic meter')
        result.value = input.value / 33810;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'liter')
        result.value = input.value / 33.814;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'milliliter')
        result.value = input.value * 29.574;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 153.7;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial quart')
        result.value = input.value / 38.43;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial pint')
        result.value = input.value / 19.215;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial cub')
        result.value = input.value / 9.608;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 1.041;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 1.665;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 4.996;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 957.5;
    else if(inputTypeValue === 'us Fluid ounce' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 1.805;


    if(inputTypeValue === 'us table spoon' && resultTypeValue === 'us table spoon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 64;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 32;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 16.231;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 2;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 3;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 256;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 67630;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'liter')
        result.value = input.value / 67.628;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'milliliter')
        result.value = input.value * 14.787;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 307.4;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial quart')
        result.value = input.value / 76.861;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial pint')
        result.value = input.value / 38.43;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial cub')
        result.value = input.value / 19.215;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 1.922;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value / 1.201;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 2.498;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 1915;
    else if(inputTypeValue === 'us table spoon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value / 1.108;


    if(inputTypeValue === 'cubic meter' && resultTypeValue === 'cubic meter')
        result.value = input.value * 1;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 1057;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 2113;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 4167;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 33810;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'us table spoon')
        result.value = input.value * 67630;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 202900;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value * 264.2;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'liter')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'milliliter')
        result.value = input.value * 1e+6;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial gallon')
        result.value = input.value * 220;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial quart')
        result.value = input.value * 879.9;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial pint')
        result.value = input.value * 1760;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial cub')
        result.value = input.value * 3520;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 35200;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 56310;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 168900;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value * 35.315;
    else if(inputTypeValue === 'cubic meter' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 61020;


    if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 192;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 96;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 48.692;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 6;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'us table spoon')
        result.value = input.value / 3;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 768;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 202900;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'liter')
        result.value = input.value / 202.9;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'milliliter')
        result.value = input.value * 4.929;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 922.3;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial quart')
        result.value = input.value / 230.6;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial pint')
        result.value = input.value / 115.3;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial cub')
        result.value = input.value / 57.646;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 5.765;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value / 3.603;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value / 1.201;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 5745;
    else if(inputTypeValue === 'us tea spoon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value / 3.325;


    if(inputTypeValue === 'liter' && resultTypeValue === 'liter')
        result.value = input.value * 1;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 1.057;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 2.113;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 4.167;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 33.814;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'us table spoon')
        result.value = input.value * 67.628;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 202.9;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'cubic meter')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 3.785;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'milliliter')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 4.546;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial quart')
        result.value = input.value / 1.136;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial pint')
        result.value = input.value * 1.76;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial cub')
        result.value = input.value * 3.52;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 35.195;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 56.312;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 168.9;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 28.317;
    else if(inputTypeValue === 'liter' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 61.024;


    if(inputTypeValue === 'milliliter' && resultTypeValue === 'milliliter')
        result.value = input.value * 1;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 946.4;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 473.2;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 240;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 29.574;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'us table spoon')
        result.value = input.value / 14.787;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'us tea spoon')
        result.value = input.value / 4.929;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'cubic meter')
        result.value = input.value / 1e+6;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'liter')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 3785;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 4546;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial quart')
        result.value = input.value / 1137;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial pint')
        result.value = input.value / 568.3;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial cub')
        result.value = input.value / 284.1;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 28.413;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial table spoon')
        result.value = input.value / 17.758;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value / 5.919;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 28320;
    else if(inputTypeValue === 'milliliter' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value / 16.387;


    if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial gallon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 4.804;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 9.608;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 18.942;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 153.7;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'us table spoon')
        result.value = input.value * 307.4;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 922.3;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 220;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'liter')
        result.value = input.value * 4.546;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'milliliter')
        result.value = input.value * 4546;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value * 1.201;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial quart')
        result.value = input.value * 4;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial pint')
        result.value = input.value * 8;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial cub')
        result.value = input.value * 16;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 160;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 256;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 768;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 6.229;
    else if(inputTypeValue === 'imperial gallon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 277.4;


    if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial quart')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 1.201;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 2.402;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 4.736;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 38.43;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'us table spoon')
        result.value = input.value * 76.861;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 230.6;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'cubic meter')
        result.value = input.value / 879.9;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'liter')
        result.value = input.value * 1.137;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'milliliter')
        result.value = input.value * 1137;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 4;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 3.331;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial pint')
        result.value = input.value * 2;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial cub')
        result.value = input.value * 4;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 40;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 64;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 192;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 24.915;
    else if(inputTypeValue === 'imperial quart' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 69.355;


    if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial pint')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 1.665;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 1.201;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 2.368;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 19.215;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'us table spoon')
        result.value = input.value * 38.43;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 115.3;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'cubic meter')
        result.value = input.value / 1760;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'liter')
        result.value = input.value / 1.76;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'milliliter')
        result.value = input.value * 568.3;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 8;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial quart')
        result.value = input.value / 2;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 6.661;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial cub')
        result.value = input.value * 2;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 20;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 32;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 96;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 49.831;
    else if(inputTypeValue === 'imperial pint' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 34.677;


    if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial cub')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 3.331;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 1.665;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 1.184;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 9.608;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'us table spoon')
        result.value = input.value * 19.215;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 57.646;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'cubic meter')
        result.value = input.value / 3520;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'liter')
        result.value = input.value / 3.52;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'milliliter')
        result.value = input.value * 284.1;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 16;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial quart')
        result.value = input.value / 4;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial pint')
        result.value = input.value / 2;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 13.323;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 10;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 16;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 48;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 99.661;
    else if(inputTypeValue === 'imperial cub' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 17.339;


    if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 33.307;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 16.654;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 8.447;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 1.041;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'us table spoon')
        result.value = input.value * 1.922;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 5.765;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'cubic meter')
        result.value = input.value / 35200;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'liter')
        result.value = input.value / 35.195;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'milliliter')
        result.value = input.value * 28.413;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 160;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial quart')
        result.value = input.value / 40;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial pint')
        result.value = input.value / 20;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial cub')
        result.value = input.value / 10;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 133.2;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 1.6;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 4.8;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 996.6;
    else if(inputTypeValue === 'uk Fluid ounce (ft2)' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 1.734;


    if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 53.291;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value  / 26.646;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 13.515;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 1.665;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'us table spoon')
        result.value = input.value * 1.201;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 3.603;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 56310;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'liter')
        result.value = input.value / 56.312;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'milliliter')
        result.value = input.value * 17.758;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 256;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial quart')
        result.value = input.value / 64;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial pint')
        result.value = input.value / 32;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial cub')
        result.value = input.value / 16;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 1.6;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 213.2;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 3;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 1595;
    else if(inputTypeValue === 'imperial table spoon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 1.084;


    if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 159.9;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 79.937;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 40.545;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 4.996;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'us table spoon')
        result.value = input.value / 2.498;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 1.201;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'cubic meter')
        result.value = input.value / 168900;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'liter')
        result.value = input.value / 168.9;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'milliliter')
        result.value = input.value * 5.919;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 768;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial quart')
        result.value = input.value / 192;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial pint')
        result.value = input.value / 96;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial cub')
        result.value = input.value / 48;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 4.8;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'imperial table spoon')
        result.value = input.value / 3;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 639.5;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 4784;
    else if(inputTypeValue === 'imperial tea spoon' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value / 2.768;


    if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'Us liquid quart')
        result.value = input.value * 29.922;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'Us liquid pint')
        result.value = input.value * 59.844;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'Us legal cup')
        result.value = input.value * 118;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value * 957.5;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'us table spoon')
        result.value = input.value * 1915;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 5745;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'cubic meter')
        result.value = input.value / 35.315;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'liter')
        result.value = input.value * 28.317;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'milliliter')
        result.value = input.value * 28320;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial gallon')
        result.value = input.value * 6.229;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial quart')
        result.value = input.value * 24.915;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial pint')
        result.value = input.value * 49.831;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial cub')
        result.value = input.value * 99.661;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value * 996.6;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial table spoon')
        result.value = input.value * 1595;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 4784;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value * 7.481;
    else if(inputTypeValue === 'cubic foot (ft³)' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 1728;


    if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'cubic inch (in³)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'Us liquid quart')
        result.value = input.value / 57.75;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'Us liquid pint')
        result.value = input.value / 28.875;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'Us legal cup')
        result.value = input.value / 14.646;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'us Fluid ounce')
        result.value = input.value / 1.805;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'us table spoon')
        result.value = input.value * 1.108;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'us tea spoon')
        result.value = input.value * 3.325;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'cubic meter')
        result.value = input.value / 61020;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'liter')
        result.value = input.value / 61.024;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'milliliter')
        result.value = input.value * 16.387;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial gallon')
        result.value = input.value / 277.4;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial quart')
        result.value = input.value / 69.355;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial pint')
        result.value = input.value / 34.677;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial cub')
        result.value = input.value / 17.339;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'uk Fluid ounce (ft2)')
        result.value = input.value / 1.734;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial table spoon')
        result.value = input.value / 1.084;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'imperial tea spoon')
        result.value = input.value * 2.768;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'cubic foot (ft³)')
        result.value = input.value / 1728;
    else if(inputTypeValue === 'cubic inch (in³)' && resultTypeValue === 'Us liquid gallon')
        result.value = input.value / 231;




}

// function for area converter 
function area_converter(input , result , inputTypeValue, resultTypeValue){

    if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value * 1e+6;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 2.59;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 1.196e+6;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 1.076e+7;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 1.55e+9;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value * 100;
    else if(inputTypeValue === 'Square Kilometer (Km²)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value * 247.1;


        
    if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 1e+6;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 2.59e+6;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 1.196;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 10.764;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 1550;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value / 10000;
    else if(inputTypeValue === 'Square meter (m²)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value / 4047;


    if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value * 2.59e+6;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value * 2.59;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 3.098e+6;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 2.788e+7;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 4.014e+9;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value * 259;
    else if(inputTypeValue === 'Square mile (mi2)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value * 640;


    if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value / 1.196;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 3.098e+6;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 1.196e+6;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 9;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 1296;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value / 11960;
    else if(inputTypeValue === 'Square yard (yd2)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value / 4840;


    if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value / 10.764;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 2.788e+7;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value / 9;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 1.076e+7;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 144;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value / 107600;
    else if(inputTypeValue === 'Square foot (ft2)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value / 43560;


    if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value / 1550;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 4.014e+9;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value / 1296;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value / 144;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 1.55e+9;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value / 1.55e+7;
    else if(inputTypeValue === 'Square inch (in2)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value / 6.273e+6;


    if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value * 10000;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 259;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 11960;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 107600;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 1.55e+7;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 100;
    else if(inputTypeValue === 'Hectare (ha)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value * 2.471;


    if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Acre (ac)')
        result.value = input.value * 1;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square meter (m²)')
        result.value = input.value * 4047;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square mile (mi2)')
        result.value = input.value / 640;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square yard (yd2)')
        result.value = input.value * 4840;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square foot (ft2)')
        result.value = input.value * 43560;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square inch (in2)')
        result.value = input.value * 6.273e+6;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Hectare (ha)')
        result.value = input.value / 2.471;
    else if(inputTypeValue === 'Acre (ac)' && resultTypeValue === 'Square Kilometer (Km²)')
        result.value = input.value / 247.1;



}

// function for weight converter 
function weight_converter(input , result , inputTypeValue , resultTypeValue){


    if(inputTypeValue === 'tonne' && resultTypeValue ==='tonne')
        result.value = input.value * 1;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='kilo gram')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='gram')
        result.value = input.value * 1e+6;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='milligram')
        result.value = input.value * 1e+9;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='micro gram')
        result.value = input.value * 1e+12;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='imperial ton')
        result.value = input.value / 1.016;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='us ton')
        result.value = input.value * 1.102;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='stone')
        result.value = input.value * 157.5;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='pound')
        result.value = input.value * 2205;
    else if(inputTypeValue === 'tonne' && resultTypeValue ==='ounce')
        result.value = input.value * 35270;


    if(inputTypeValue === 'kilo gram' && resultTypeValue ==='kilo gram')
        result.value = input.value * 1;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='tonne')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='gram')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='milligram')
        result.value = input.value * 1e+6;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='micro gram')
        result.value = input.value * 1e+9;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='imperial ton')
        result.value = input.value / 1016;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='us ton')
        result.value = input.value / 907.2;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='stone')
        result.value = input.value / 6.35;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='pound')
        result.value = input.value * 2.205;
    else if(inputTypeValue === 'kilo gram' && resultTypeValue ==='ounce')
        result.value = input.value * 35.274;


    if(inputTypeValue === 'gram' && resultTypeValue ==='gram')
        result.value = input.value * 1;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='kilo gram')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='tonne')
        result.value = input.value / 1e+6;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='milligram')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='micro gram')
        result.value = input.value * 1e+6;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='imperial ton')
         result.value = input.value / 1.016e+6;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='us ton')
        result.value = input.value / 907200;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='stone')
        result.value = input.value / 6350;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='pound')
        result.value = input.value / 453.6;
    else if(inputTypeValue === 'gram' && resultTypeValue ==='ounce')
        result.value = input.value / 28.35;


    if(inputTypeValue === 'milligram' && resultTypeValue ==='milligram')
        result.value = input.value * 1;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='kilo gram')
        result.value = input.value / 1e+6;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='gram')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='tonne')
        result.value = input.value / 1e+9;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='micro gram')
        result.value = input.value * 1000;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='imperial ton')
        result.value = input.value / 1.016e+9;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='us ton')
        result.value = input.value / 9.072e+8;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='stone')
        result.value = input.value / 6.35e+6;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='pound')
        result.value = input.value / 453600;
    else if(inputTypeValue === 'milligram' && resultTypeValue ==='ounce')
        result.value = input.value / 28350;


    if(inputTypeValue === 'micro gram' && resultTypeValue ==='micro gram')
        result.value = input.value * 1;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='kilo gram')
        result.value = input.value / 1e+9;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='gram')
        result.value = input.value / 1e+6;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='milligram')
        result.value = input.value / 1000;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='tonne')
        result.value = input.value / 1e+12;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='imperial ton')
        result.value = input.value / 1.016e+12;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='us ton')
        result.value = input.value / 9.072e+11;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='stone')
        result.value = input.value / 6.35e+9;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='pound')
        result.value = input.value / 4.536e+8;
    else if(inputTypeValue === 'micro gram' && resultTypeValue ==='ounce')
        result.value = input.value / 2.835e+7;


    if(inputTypeValue === 'imperial ton' && resultTypeValue ==='imperial ton')
        result.value = input.value * 1;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='kilo gram')
        result.value = input.value * 1016;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='gram')
        result.value = input.value * 1.016e+6;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='milligram')
        result.value = input.value * 1.016e+9;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='micro gram')
        result.value = input.value * 1.016e+12;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='tonne')
        result.value = input.value * 1.016;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='us ton')
        result.value = input.value * 1.12;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='stone')
        result.value = input.value * 160;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='pound')
        result.value = input.value * 2240;
    else if(inputTypeValue === 'imperial ton' && resultTypeValue ==='ounce')
        result.value = input.value * 35840;


    if(inputTypeValue === 'us ton' && resultTypeValue ==='us ton')
        result.value = input.value * 1;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='kilo gram')
        result.value = input.value * 907.2;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='gram')
        result.value = input.value * 907200;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='milligram')
        result.value = input.value * 9.072e+8;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='micro gram')
        result.value = input.value * 9.072e+11;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='imperial ton')
        result.value = input.value / 1.12;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='tonne')
        result.value = input.value / 1.102;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='stone')
        result.value = input.value * 142.9;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='pound')
        result.value = input.value * 2000;
    else if(inputTypeValue === 'us ton' && resultTypeValue ==='ounce')
        result.value = input.value * 32000;


    if(inputTypeValue === 'stone' && resultTypeValue ==='stone')
        result.value = input.value * 1;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='kilo gram')
        result.value = input.value * 6.35;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='gram')
        result.value = input.value * 6350;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='milligram')
        result.value = input.value * 6.35e+6;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='micro gram')
        result.value = input.value * 6.35e+9;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='imperial ton')
        result.value = input.value / 160;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='us ton')
        result.value = input.value / 142.9;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='tonne')
        result.value = input.value / 157.5;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='pound')
        result.value = input.value * 14;
    else if(inputTypeValue === 'stone' && resultTypeValue ==='ounce')
        result.value = input.value * 224;


    if(inputTypeValue === 'pound' && resultTypeValue ==='pound')
        result.value = input.value * 1;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='kilo gram')
        result.value = input.value / 2.205;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='gram')
        result.value = input.value * 453.6;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='milligram')
        result.value = input.value * 453600;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='micro gram')
        result.value = input.value * 4.536e+8;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='imperial ton')
        result.value = input.value / 2240;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='us ton')
        result.value = input.value / 2000;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='stone')
        result.value = input.value / 14;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='tonne')
        result.value = input.value / 2205;
    else if(inputTypeValue === 'pound' && resultTypeValue ==='ounce')
        result.value = input.value * 16;


    if(inputTypeValue === 'ounce' && resultTypeValue ==='ounce')
        result.value = input.value * 1;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='kilo gram')
        result.value = input.value / 35.274;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='gram')
        result.value = input.value * 28.35;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='milligram')
        result.value = input.value * 28350;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='micro gram')
        result.value = input.value * 2.835e+7;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='imperial ton')
        result.value = input.value / 35840;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='us ton')
        result.value = input.value / 32000;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='stone')
        result.value = input.value / 224;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='pound')
        result.value = input.value / 16;
    else if(inputTypeValue === 'ounce' && resultTypeValue ==='tonne')
        result.value = input.value / 35270;


}

// function for pressure converter 
function pressure_converter(input , result , inputTypeValue ,resultTypeValue){
   
    if(inputTypeValue === 'atmosphere' && resultTypeValue === 'atmosphere')
        result.value = input.value * 1;
    else if(inputTypeValue === 'atmosphere' && resultTypeValue === 'bar')
        result.value = input.value * 1.013;
    else if(inputTypeValue === 'atmosphere' && resultTypeValue === 'pascal')
        result.value = input.value * 101300;
    else if(inputTypeValue === 'atmosphere' && resultTypeValue === 'pound/square inch')
        result.value = input.value * 14.696;
    else if(inputTypeValue === 'atmosphere' && resultTypeValue === 'torr')
        result.value = input.value * 760;

        
    if(inputTypeValue === 'bar' && resultTypeValue === 'bar')
        result.value = input.value * 1;
    else if(inputTypeValue === 'bar' && resultTypeValue === 'atmosphere')
        result.value = input.value / 1.013;
    else if(inputTypeValue === 'bar' && resultTypeValue === 'pascal')
        result.value = input.value * 100000;
    else if(inputTypeValue === 'bar' && resultTypeValue === 'pound/square inch')
        result.value = input.value * 14.504;
    else if(inputTypeValue === 'bar' && resultTypeValue === 'torr')
        result.value = input.value * 750.1;


    if(inputTypeValue === 'pascal' && resultTypeValue === 'pascal')
        result.value = input.value * 1;
    else if(inputTypeValue === 'pascal' && resultTypeValue === 'bar')
        result.value = input.value / 100000;
    else if(inputTypeValue === 'pascal' && resultTypeValue === 'atmosphere')
        result.value = input.value / 101300;
    else if(inputTypeValue === 'pascal' && resultTypeValue === 'pound/square inch')
        result.value = input.value / 6895;
    else if(inputTypeValue === 'pascal' && resultTypeValue === 'torr')
        result.value = input.value / 133.3;


    if(inputTypeValue === 'pound/square inch' && resultTypeValue === 'pound/square inch')
        result.value = input.value * 1;
    else if(inputTypeValue === 'pound/square inch' && resultTypeValue === 'bar')
        result.value = input.value / 14.504;
    else if(inputTypeValue === 'pound/square inch' && resultTypeValue === 'pascal')
        result.value = input.value * 6895;
    else if(inputTypeValue === 'pound/square inch' && resultTypeValue === 'atmosphere')
        result.value = input.value / 14.696;
    else if(inputTypeValue === 'pound/square inch' && resultTypeValue === 'torr')
        result.value = input.value * 51.715;


    if(inputTypeValue === 'torr' && resultTypeValue === 'torr')
        result.value = input.value * 1;
    else if(inputTypeValue === 'torr' && resultTypeValue === 'bar')
        result.value = input.value / 750.1;
    else if(inputTypeValue === 'torr' && resultTypeValue === 'pascal')
        result.value = input.value * 133.3;
    else if(inputTypeValue === 'torr' && resultTypeValue === 'pound/square inch')
        result.value = input.value / 51.715;
    else if(inputTypeValue === 'torr' && resultTypeValue === 'atmosphere')
        result.value = input.value / 760;
}