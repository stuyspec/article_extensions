import React from 'react';

import { IExtensionProps } from '../extensions';

interface IParsedProps {
    mediumIds: string[]
}

export interface IProps { };

export const MediaExtension: React.FC<IExtensionProps> = ({ media }: IExtensionProps) => {

    //makes a copy so media filtering doesn't affect other components
    //article = {...article};
    if (media) {
        //Set used in case many media present to avoid quadratic complexity.
        // const selectedMedia = new Set(parsedProps.mediumIds);
        // article.media = article.media.filter(m => selectedMedia.has(m.id));

        return <ArticleMedia media={media} />

    }
    else return null;
}

import { Gallery } from './Gallery';
import { Lightbox } from './Lightbox';
import { ArticleMedium } from './ArticleMedium';

interface IArticleMediaProps {
    media: any[]
}

export const ArticleMedia: React.FC<IArticleMediaProps> = ({ media }: IArticleMediaProps) => {
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
    return (
        <>
            {media.length > 1 && (
                <Lightbox isVisible={isLightboxOpen} onClose={() => setIsLightboxOpen(false)}>
                    <Gallery media={media} />
                </Lightbox>
            )}
            {media && media.length > 0 && (
                <ArticleMedium
                    medium={media[0]}
                    isCarouselButtonVisible={media.length > 1}
                    carouselImageCount={media.length}
                    onCarouselButtonClick={() => setIsLightboxOpen(true)}
                />
            )}
        </>
    )
}

