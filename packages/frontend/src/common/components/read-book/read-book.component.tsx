import React, { useEffect, useRef, useState } from 'react';
import ePub, { Book, Rendition } from 'epubjs';
import * as Styled from './read-book.styled';
import { useOwnBookById, useUpdateLocationIndexInOwnBook } from '@/common/hooks/use-own-book';
import { useDebounce } from '@/common/hooks/use-debounce';
import { OrderByOwnBookEnum } from '@/common/types/own-books.type';

interface IReadBookProps {
  id: string;
  orderBy: OrderByOwnBookEnum;
}
export const ReadBookComponent = ({ id, orderBy }: IReadBookProps) => {
  const [isHasNextSection, setIsHasNextSection] = useState(false);
  const [isHasPrevSection, setIsHasPrevSection] = useState(false);
  const onClick = () => {};
  const { data, isLoading, refetch, isRefetching } = useOwnBookById(id);
  const ref = useRef<HTMLDivElement | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [locationIndex, setLocatinIndex] = useState<undefined | string>();
  const debouncedLocationIndex = useDebounce<string | undefined>(locationIndex, 2500);

  const { mutateAsync } = useUpdateLocationIndexInOwnBook({ id, orderBy });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (debouncedLocationIndex && data?.locationIndex !== debouncedLocationIndex) {
      mutateAsync(debouncedLocationIndex);
    }
  }, [debouncedLocationIndex]);
  let rendition: Rendition | undefined;
  let book: Book | undefined;

  const handleKeyPress = (e: any) => {
    const keyPressed = e.key;

    if (keyPressed === 'ArrowLeft') {
      if (!renditionRef.current) return;
      renditionRef.current.next();
      e.preventDefault();
    } else if (keyPressed === 'ArrowRight') {
      if (!renditionRef.current) return;
      renditionRef.current.next();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isLoading || isRefetching || !data?.contentUrl || !ref?.current || !ePub) return;
    const height = document.documentElement.scrollHeight;

    book = ePub(data.contentUrl);
    rendition = book.renderTo(ref.current, {
      allowScriptedContent: true,
      flow: 'paginated',
      // flow: 'scrolled',
      spread: 'none',
      width: '100%',
      height: height - 110
    });
    if (!rendition || !book) return;
    renditionRef.current = rendition;
    rendition.display(data.locationIndex ? data.locationIndex : undefined);

    const next = document.getElementById('next');

    const prev = document.getElementById('prev');

    if (!next || !book || !prev) return;

    book.ready
      .then(() => {
        const stored = localStorage.getItem(`${book?.key()}-locations`);
        if (stored) {
          return book?.locations.load(stored);
        }
        return book?.locations.generate(512); // Generates CFI for every X characters (Characters per/page)
      })
      .then(() => {
        localStorage.setItem(`${book?.key()}-locations`, book?.locations.save() ?? '');
      });

    rendition.on('relocated', (location: { start: { index: number; cfi: string }; end: { index: number; cfi: string } }) => {
      if (!book) return;
      const progress = book.locations.percentageFromCfi(location.start.cfi);
      setLocatinIndex(progress.toString());
    });

    prev.addEventListener(
      'click',
      (e) => {
        if (!renditionRef.current) return;
        renditionRef.current.next();
        e.preventDefault();
      },
      false
    );

    next.addEventListener(
      'click',
      (e) => {
        if (!renditionRef.current) return;
        renditionRef.current.next();
        e.preventDefault();
      },
      false
    );

    document.addEventListener('keydown', handleKeyPress);

    rendition.on('rendered', (section: any) => {
      const nextSection = section.next();
      const prevSection = section.prev();

      if (nextSection) {
        setIsHasNextSection(true);
      } else {
        setIsHasNextSection(false);
      }

      if (prevSection) {
        setIsHasPrevSection(true);
      } else {
        setIsHasPrevSection(false);
      }
    });
    return () => {
      renditionRef.current?.destroy();
      renditionRef.current = null;
      book?.destroy();
    };
  }, [data, isLoading, isRefetching, ref, renditionRef]);

  return (
    <>
      <Styled.ReadBookWrapper onClick={onClick} ref={ref} />
      <Styled.StepButtonWrapper>
        <button id="prev" type="button" disabled={!isHasPrevSection}>
          PREV
        </button>
        <button id="next" type="button" disabled={!isHasNextSection}>
          NEXT
        </button>
      </Styled.StepButtonWrapper>
    </>
  );
};
