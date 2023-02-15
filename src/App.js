import './App.css';
import {MagicText} from "./MagicText";
import {ReactComponent as Square} from './square.svg';
import './MagicText.css';

const styling = {
  text: {
      background: "linear-gradient(to right, DarkGreen, ForestGreen, Lime, LimeGreen)",
      backgroundSize: "200%",
  },
  particle: {
      scale: "1",
      fill: "#23a60866"
  }
}

function App() {
  return <div className="App">
      <h1>
          Hello, this is the <MagicText text={"purple wizard"}/> and I am here to purple you.
      </h1>
      <h1>
          Hello, this is the <MagicText text={"green wizard"}
            particleCount={2}
            oneParticleDelay={700}
            particleSvg={<Square/>}
            particleStyling={styling.particle}
            textStyling={styling.text}
          /> and I am here to green you.
      </h1>
  </div>
}

export default App;
