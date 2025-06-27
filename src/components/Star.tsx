export const Star = ({
                         size,
                         top,
                         left,
                         delay,
                     }: {
    size: number;
    top: string;
    left: string;
    delay: string;
}) => (
    <div
        className="absolute rounded-full bg-white animate-twinkle"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            top,
            left,
            opacity: Math.random() * 0.7 + 0.3,
            animationDelay: delay,
        }}></div>
);

export const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const delay = `${Math.random() * 3}s`;
        stars.push(
            <Star key={i} size={size} top={top} left={left} delay={delay}/>
        );
    }
    return stars;
};