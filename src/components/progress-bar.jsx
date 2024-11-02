// CSS
import '../styles/progress-bar.css'

export default function ProgressBar({progress, color__fill, color}) {
    return (
        <div class="progress-bar" style={{background: color}}>
            <div class="progress-bar__fill" style={{width: `${progress}%`, background: color__fill}}></div>
        </div>
    )
}