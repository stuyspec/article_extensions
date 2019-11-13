import React from 'react';
import Slider from 'react-slick';
import { createUseStyles } from "react-jss";

import { SliderFooter } from './SliderFooter';

const styles = {
    Gallery: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
        position: "relative",
        width: "90%",
        "& *": {
            // necessary for react-slick + flex
            minHeight: 0,
            minWidth: 0,
        },
    },
    Slider: {
        "& .slick-next:before, .slick-prev:before": {
            fontSize: "20px",
            color: "#00558B",
            opacity: 0.75,
        },
    },
    slideContainer: {},
    slide: {
        alignItems: "center",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        margin: 0,
    },
    imageContainer: {
        //maxHeight: "75"
    },
    image: {
        margin: "0 auto",
        maxHeight: "75vh",
        maxWidth: "100%",
        width: "auto",
        objectFit: "contain",
    },
    slideCaption: {
        alignSelf: "flex-start",
        width: "100%",
        "& p": {
            color: "#fff",
            marginTop: "10px",
            width: "100%",
            fontFamily: "Minion Pro",
            fontStyle: "italic",
            fontSize: "17px",
            textAlign: "center",
        },
    },
    thumbnailImage: {
        height: "100%",
        width: "100%",
    },
};

const useStyles = createUseStyles(styles);

interface IProps {
    media: any[]
}

export const Gallery: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    const [index, setIndex] = React.useState(0);
    const [slider, setSlider] = React.useState<Slider | null>(null);

    const nextSlide = () => {
        if (slider) {
            slider.slickNext();
        }
    };
    const prevSlide = () => {
        if (slider) {
            slider.slickPrev();
        }
    };

    const settings = {
        customPaging: i => {
            return (
                <a key={i}>
                    <img
                        className={classes.thumbnailImage}
                        src={props.media[i].thumb_attachment_url}
                    />
                </a>
            );
        },
        afterChange: currentSlideIndex =>
            setIndex(currentSlideIndex),
        arrows: false,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={classes.Gallery}>
            <Slider
                {...settings}
                ref={c => setSlider(c)}
                className={classes.Slider}
            >
                {props.media.map(image => {
                    // Temporary fix of an unintentionally rotated image.
                    // REQUIRES A MORE SOLID FIX
                    const imgSrc =
                        image.id == 261 ? image.medium_attachment_url : image.attachment_url;

                    // Slide unable to be taken out of .map(); there seems to be
                    // HTML classes passed down that are interrupted when the
                    // following figure is substituted with a custom component.
                    return (
                        <div className={classes.slideContainer} key={image.id}>
                            <figure className={classes.slide}>
                                <img className={classes.image} src={imgSrc} />
                                <figcaption className={classes.slideCaption}>
                                    <p>{image.caption}</p>
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </Slider>
            <SliderFooter
                helperText={`${index + 1} of ${props.media.length}`}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
            />
        </div>
    );

}
