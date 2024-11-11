import QuestCanvas from "../../components/GameComponents/QuestCanvas"
import HUD from "../../components/HUD/HUD"

const QuestGameView = () => {
  return (
    <div className="my-games-page">
        <HUD />
        <QuestCanvas />
    </div>
  )
}

export default QuestGameView