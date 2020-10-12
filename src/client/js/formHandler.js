export async function handleSubmit(event) {
    event.preventDefault()

    let form = document.querySelector('form');
    let formText = document.getElementById('name').value;
    let text;
    
    handleURL(formText);
    if (formText) {
        text = {
            title: formText,
            type: "url",
        };
    } else {
        text = {
            title: formText,
            type: "txt",
        };
    }
    
    console.log("::: Form Submitted :::")
            await fetch('http://localhost:8081/test', {
            method: 'POST',
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: text.title 
        });
        const sentiment = await fetch('http://localhost:8081/sentiment');
        let newData = await sentiment.json();
        try {
            console.log(newData);
            document.querySelector('.score_tag').textContent =newData.score_tag;
            document.querySelector('.agreement').textContent =newData.agreement;
            document.querySelector('.subjectivity').textContent = newData.subjectivity;
            document.querySelector('.confidence').textContent = newData.confidence;
            document.querySelector('.irony').textContent = newData.irony;
        } catch (error) {
            console.log(error);
        }
        form.reset();
    }
    
import { handleURL } from "./formChecker";

