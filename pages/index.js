import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleDonateClick() {
    // Add your donation handling code here
    window.open("https://www.cardinaltrading.co/product/iktomi-costs-services/197", "_blank");
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
      setIsLoading(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Cardinal Trading Co.</title>
        <link rel="icon" href="/1.png" />
      </Head>

      <main className={styles.main}>
        <a href="https://www.cardinaltrading.co" target="_blank">
            <img src="/1.png" className={styles.icon} alt="Cardinal Trading Co. Logo"/>
        </a>
        <h3>Iktomi - The Storyteller</h3>
        <div className={styles.container}>Beta </div>
        <div className={styles.container}>I gather your stories from my interwebs </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="What would you like to know?"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Weave" />
        </form>
        <div className={styles.container1}>Click once - Be Patient as I weave your story</div>


        {isLoading ? (
        <div className={styles.loading}>{/* loading spinner will be displayed here */}</div>
        ) : (
          <div className={styles.container}>
            <div className={styles.result}>{result}</div>
          </div> 
        )}

      </main>
      <footer>
        <div className={styles.footer}>
        <div className={styles.container1}> Thank you for testing out my app. If you like what you see and want to help with the costs you can for Iktomi - Storyteller click the donate button! If you have suggestion of improvement please email at j@cardinaltrading.co</div>
        <a href="https://www.cardinaltrading.co/product/iktomi-costs-services/197" target="_blank">
          <button onClick={handleDonateClick}>Donate</button>
        </a>
        </div>
      </footer>
    </div>
  );
}
