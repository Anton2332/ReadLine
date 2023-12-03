import React, { useEffect, useRef, useState } from 'react';
import ePub, { Book, Rendition } from 'epubjs';
import * as Styled from './read-book.styled';
import { useOwnBookById, useUpdateLocationIndexInOwnBook } from '@/common/hooks/use-own-book';
import { useDebounce } from '@/common/hooks/use-debounce';

interface IReadBookProps {
  id: string;
}
export const ReadBookComponent = ({ id }: IReadBookProps) => {
  const onClick = () => {};
  const { data, isLoading } = useOwnBookById(id);
  const ref = useRef<HTMLDivElement | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [locationIndex, setLocatinIndex] = useState<undefined | string>();
  const debouncedLocationIndex = useDebounce<string | undefined>(locationIndex, 2500);

  const { mutateAsync } = useUpdateLocationIndexInOwnBook(id);

  useEffect(() => {
    if (debouncedLocationIndex && data?.locationIndex !== debouncedLocationIndex) {
      mutateAsync(debouncedLocationIndex);
    }
  }, [debouncedLocationIndex]);
  let rendition: Rendition | undefined;
  let book: Book | undefined;
  useEffect(() => {
    if (isLoading || !data?.contentUrl || !ref?.current) return;

    book = ePub(data.contentUrl);
    rendition = book.renderTo(ref.current, {
      allowScriptedContent: true,
      manager: 'continuous',
      flow: 'scrolled',
      width: '100%',
      height: '100%'
    });
    if (!rendition || !book) return;
    renditionRef.current = rendition;
    rendition.display(data.locationIndex ? data.locationIndex : undefined);

    const next = document.getElementById('next');

    const prev = document.getElementById('prev');

    if (!next || !book || !prev) return;

    rendition.on('relocated', (location: { start: { index: number }; end: { index: number } }) => {
      setLocatinIndex(location.start.index.toString());
    });

    prev.addEventListener(
      'click',
      (e) => {
        rendition?.prev();
        e.preventDefault();
      },
      false
    );

    next.addEventListener(
      'click',
      (e) => {
        rendition?.next();
        e.preventDefault();
      },
      false
    );

    rendition.on('rendered', (section: any) => {
      const nextSection = section.next();
      const prevSection = section.prev();

      if (nextSection) {
        const nextNav = book?.navigation.get(nextSection.href);
        let nextLabel: string | undefined;
        if (nextNav) {
          nextLabel = nextNav.label;
        } else {
          nextLabel = 'next';
        }

        next.textContent = `${nextLabel} »`;
      } else {
        next.textContent = '';
      }

      if (prevSection) {
        const prevNav = book?.navigation.get(prevSection.href);

        let prevLabel: string | undefined;
        if (prevNav) {
          prevLabel = prevNav.label;
        } else {
          prevLabel = 'previous';
        }

        prev.textContent = `« ${prevLabel}`;
      } else {
        prev.textContent = '';
      }
    });
    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, [data, isLoading, ref]);

  return (
    <>
      <a id="prev" href="#prev" className="navlink">
        ...
      </a>
      <a id="next" href="#next" className="navlink">
        ...
      </a>
      <Styled.ReadBookWrapper onClick={onClick} ref={ref} />
    </>
  );
};
