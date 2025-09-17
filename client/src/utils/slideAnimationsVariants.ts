

function slideAnimationVariants() {
    const sectionVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.1,
                staggerChildren: 0.03,
                staggerDirection: 1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1,
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    }
    const inputVariants = {
        hidden: {
            opacity: 0, x: 500,
        },
        visible: {
            opacity: 1, x: 0,
        },
        transition: { type: 'tween' },
        exit: {
            opacity: 0, x: -500
        }

    }

    return {sectionVariants,inputVariants}
}

export default slideAnimationVariants