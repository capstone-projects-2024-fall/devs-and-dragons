//import HUD from "../../components/HUD/HUD";
import squareImg from './square.png';
import circleImg from './circle.png';
import triangleImg from './triangle.png';


const AvatarPage = () => (
    <div style={{ backgroundColor: 'pink', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1> Avatar Page </h1>
        {/*<HUD />*/}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={squareImg} alt ="Square Shape" style = {{ width:'100px'}} />
            <img src={circleImg} alt ="Circle Shape" style = {{ width:'100px', marginLeft: '10px'}} />
            <img src={triangleImg} alt ="Triangle Shape" style = {{ width:'100px', marginLeft: '10px'}} />
        </div>

    </div>
);

export default AvatarPage;