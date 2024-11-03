import QuestCanvas from "../../components/QuestCanvas/QuestCanvas"
import HUD from "../../components/HUD/HUD"

const QuestView = () => {
  return (
    <div className="my-games-page">
        <HUD />
        <QuestCanvas />
    </div>
  )
}

export default QuestView