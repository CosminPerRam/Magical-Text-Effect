import { useEffect, useState } from "react";
import { ReactComponent as Star } from './star.svg';
import './MagicText.css';

const styling = {
    text: {
        animation: `background-pan 3s alternate infinite`,
        background: "linear-gradient(to right, purple, violet, fuchsia, purple)",
        backgroundSize: "300%",
        WebkitBackgroundClip: 'text',
        BackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WhiteSpace: 'nowrap'
    },
    particle: intervalDelay => ({
        "--size": "clamp(20px, 1.5vw, 30px)",
        height: "var(--size)",
        width: "var(--size)",
        scale: "1.5",
        display: 'block',
        position: 'absolute',
        animation: `scale ${intervalDelay}ms ease forwards`,
        fill: '#80008088'
    }),
    particleContainer: intervalDelay => ({
        animation: `rotate ${intervalDelay}ms linear infinite`,
        display: "block"
    }),
    container: {
        display: "inline-block",
        position: "relative"
    }
}

const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const MagicParticle = ({particleIndex,
                           particleCount,
                           oneParticleDelay,
                           particleStyling,
                           particleSvg}) => {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const intervalDelay = particleCount * oneParticleDelay;
    const timeoutDelay = particleIndex * oneParticleDelay;

    useEffect(() => {
        let interval = null;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setTop(rand(0, 60));
                setLeft(rand(0, 100));
            }, intervalDelay);
        }, timeoutDelay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [particleIndex, intervalDelay, timeoutDelay])

    return <span key={top} 
        style={{...styling.particle(intervalDelay), 
        ...particleStyling, 
        top: `${top}%`, 
        left: `${left}%`}}>
            <div style={{...styling.particleContainer(intervalDelay)}}>
                {particleSvg}
            </div>
        </span>
}

export const MagicText = ({text, 
    particleStyling, 
    textStyling, 
    particleSvg = 
    <Star/>, 
    particleCount = 3, 
    oneParticleDelay = 400}) => {
    return <span style={styling.container}>
        { Array.from(Array(particleCount).keys()).map(index =>
            <MagicParticle key={index}
                        particleIndex={index}
                        particleCount={particleCount}
                        particleSvg={particleSvg}
                        particleStyling={particleStyling}
                        oneParticleDelay={oneParticleDelay}/>
        ) }
        <span style={{...styling.text, ...textStyling}}>
            {text}
        </span>
    </span>
}
