import * as React from 'react';
import { createUseStyles } from 'react-jss';

const mediumStyles = {
    figure: {
        margin: "0 0 28px 0",
        width: "100%",
    },
    tallFigure: {
        float: "left",
        marginTop: "9px !important",
        marginBottom: "5px",
        paddingRight: "3.5% !important",
        width: "55%",
    },
    imgContainer: {
        position: "relative",
        background: "none !important",
        "& img": {
            width: "100%",
        },
        "& button": {
            bottom: "20px",
            left: "20px",
            position: "absolute",
        },
    },
    carouselButton: {
        backgroundColor: "#fff",
        border: "none",
        borderRadius: 0,
        display: "flex",
        alignItems: "center",
        opacity: 0.8,
        outline: "none",
        padding: "8px 11px",
        transitionDuration: ".3s",
        "&:hover": {
            opacity: 0.9,
        },
    },
    slidesIcon: {
        width: "23px !important",
    },
    carouselImageCount: {
        fontFamily: "Circular Std",
        fontSize: "17px",
        marginLeft: "12px",
    },
    "@media (max-width: 767px)": {
        tallFigure: {
            "& > div > img": {
                marginLeft: "0 !important",
                width: "100% !important",
            },
        },
    },
};

interface IArticleMediumProps {
    medium: any,
    isCarouselButtonVisible?: boolean,
    carouselImageCount: number,
    onCarouselButtonClick: () => any
}

const useStyles = createUseStyles(mediumStyles);

export const ArticleMedium: React.FunctionComponent<IArticleMediumProps> = (props: IArticleMediumProps) => {
    const classes = useStyles();

    const [imageTall, setImageTall] = React.useState(false);
    const [image] = React.useState(() => new Image());

    React.useEffect(() => {
        image.src = props.medium.thumb_attachment_url;
        image.onload = () =>
            setImageTall(image.height > image.width * 1.3);
    }, []);

    return (
        <figure className={imageTall ? classes.tallFigure : classes.figure}>
            <div className={classes.imgContainer}>
                <img src={props.medium.attachment_url} />
                {props.isCarouselButtonVisible && (
                    <button className={classes.carouselButton} onClick={props.onCarouselButtonClick}>
                        <img className={classes.slidesIcon} src="/img/slides.svg" />
                        <span className={classes.carouselImageCount}>
                            {props.carouselImageCount}
                        </span>
                    </button>
                )}
            </div>
            <Caption medium={props.medium} />
        </figure>
    )
}

const captionStyles = {
    caption: {
        fontFamily: "Minion Pro",
        fontSize: "14px",
        lineHeight: "1.1",
        marginTop: "10px",
    },
    creditLine: {
        color: "#888",
        position: "relative",
    },
    mediumType: {
        textTransform: 'capitalize',
        display: 'inline',
    }
};

const useCaptionStyles = createUseStyles(captionStyles);

interface ICaptionProps {
    medium: any
}

const Caption: React.FC<ICaptionProps> = ({ medium }: ICaptionProps) => {
    const classes = useCaptionStyles();

    const { user } = medium;
    let { caption } = medium;

    // If the caption does not end in a period, add one.
    if (caption && caption.substr(caption.length - 1) !== ".") {
        caption += ".";
    }

    const PROFILE_SLUGS: { [index: string]: string } = {
        illustration: "illustrators",
        photo: "photographers",
        illustrators: "illustration",
        photographers: "photo",
    };

    return (
        <figcaption className={classes.caption}>
            <span>
                {/* Render caption if caption is not null and is not empty string. */}
                {caption && caption + " "}
            </span>
            <a
                className={classes.creditLine}
                href={`/${PROFILE_SLUGS[medium.media_type]}/${user.slug}`}
            >
                <div className={classes.mediumType}>{medium.media_type}</div>
                &nbsp;by&nbsp;
                {user.first_name}
                {/* Department names are stored in firstName, not lastName, requiring 
              the following logic */}
                {user.last_name !== "" && " " + user.last_name}
            </a>
            .
      </figcaption>
    );
};
