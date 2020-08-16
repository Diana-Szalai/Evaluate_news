export async function handleSubmit(event) {
    event.preventDefault()

    let form = document.querySelector('form');
    let formText = document.getElementById('name').value;
    let text;
    
    handleURL(formText);
    //if (formText) {
    //    text = {
    //        title: formText,
    //        type: "url",
    //    };
    //} else {
    //    text = {
    //        title: formText,
    //        type: "txt",
    //    };
    //}
    console.log("::: Form Submitted :::")
            await fetch('http://localhost:5051/test', {
            method: 'POST',
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: text.title 
        });
        const sentiment = await fetch('http://localhost:5051/sentiment');
        let newData = await sentiment.json();
        try {
            console.log(newData);
            document.querySelector('.cityLat').textContent =newData.cityLat;
            document.querySelector('.cityLong').textContent =newData.cityLong;
            document.querySelector('.country').textContent = newData.country;
            document.querySelector('.population').textContent = newData.population;
            document.querySelector('.countryCode').textContent = newData.countryCode;
        } catch (error) {
            console.log(error);
        }
        form.reset();
    }
    
import { handleURL } from "./formChecker";

