import Modal1 from "../components/Modal1";

export default function Modals() {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Modal1
        title="Novak Djokovic"
        content="Novak Djokovic is a Serbian tennis player, widely regarded as one of the greatest of all time. Known for his incredible flexibility, return of serve, and mental toughness, he holds the most Grand Slam titles in men's singles history."
        buttonText="Open Djokovic Modal"
      />
      <Modal1
        title="Rafael Nadal"
        content="Rafael Nadal, also known as the 'King of Clay,' is a Spanish tennis legend. He is renowned for his dominance on clay courts, his powerful topspin forehand, and his unmatched fighting spirit."
        buttonText="Open Nadal Modal"
      />
      <Modal1
        title="Roger Federer"
        content="Roger Federer, from Switzerland, is celebrated for his elegant playing style and all-court mastery. With 20 Grand Slam titles and unmatched popularity worldwide, he is considered one of the most influential athletes in sports history."
        buttonText="Open Federer Modal"
      />
    </div>
  );
}
