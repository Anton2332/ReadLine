import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { Button, Input } from '@mui/material';
import * as Styled from './add-own-book-modal.styled';
import { ModalComponent } from '@/common/components/modal';
import { useUploadOwnBook } from '@/common/hooks/use-own-book';
import { FileType, OrderByOwnBookEnum } from '@/common/types/own-books.type';
import { Loader } from '@/common/components/loader';
import { blobToFile } from '@/common/utils/convert-blob-to-file';

interface AddOwnBookModalProps {
  open: boolean;
  orderBy: OrderByOwnBookEnum;
  closeHandler: () => void;
}

export const AddOwnBookModalComponent = ({ open, orderBy, closeHandler }: AddOwnBookModalProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [book, setBook] = useState<File | null>(null);
  const bookRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState('');

  const close = () => {
    closeHandler();
    setBook(null);
    setImage(undefined);
  };

  const { mutateAsync, isLoading } = useUploadOwnBook({ orderBy, onSuccess: () => close() });

  const handleTitleChange = async (e: any) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = async (e: any) => {
    setAuthor(e.target.value);
  };

  const handlePhotoChange = (e: any) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);

    const imageSrc = URL.createObjectURL(e.target.files[0]);
    setImageUrl(imageSrc);
  };

  const handleEpubFileChange = async (e: any) => {
    if (!e.target.files[0]) return;
    setBook(e.target.files[0]);
  };

  useEffect(() => {
    if (!title || title.length < 3 || title.length > 70) {
      setError('Title must be least 3 characters and less than 70');
      return;
    }

    if (!title || author.length < 3 || title.length > 70) {
      setError('Autor must be least 3 characters and less than 70');
      return;
    }

    if (!image || !imageUrl) {
      setError("Image can't be empty");
      return;
    }

    if (!book) return;
    setError('');
  }, [title, author, image, book, imageUrl]);

  const handleSubmitClick = () => {
    if (!book || !image || error.length) return;
    mutateAsync({ title, author, image, book, contentType: FileType.EPUB });
  };

  const checkBook = async () => {
    if (!book) return;
    const Book = ePub(await book.arrayBuffer());
    const metadata = await Book.loaded.metadata;
    const cover = await Book.loaded.cover;

    const coverBlob = await Book.archive.getBlob(cover);
    if (metadata && metadata.title?.length) {
      setTitle(metadata.title);
    }

    if (metadata && metadata.creator?.length) {
      setAuthor(metadata.creator);
    }

    if (coverBlob) {
      const coverFile = blobToFile(coverBlob, 'cover');
      setImage(coverFile);

      const imageSrc = URL.createObjectURL(coverFile);
      setImageUrl(imageSrc);
    }
  };

  useEffect(() => {
    checkBook();
  }, [book]);

  return (
    <ModalComponent open={open} closeHandler={close} hideChildeShadow hideChildBackground>
      <Styled.AddOwnBookWrapper onSubmit={handleSubmitClick}>
        <Styled.FileInput ref={bookRef} type="file" id="epubFile" accept=".epub" onChange={handleEpubFileChange} disabled={isLoading} />
        <Styled.CustomButton variant={book ? 'contained' : 'outlined'} onClick={() => bookRef?.current?.click()}>
          {book ? 'The file is selected' : 'Select a file'}
        </Styled.CustomButton>
        {book && (
          <>
            Title:
            <Input placeholder="Fill Title" type="text" id="title" value={title} onChange={handleTitleChange} />
            Author:
            <Input placeholder="Fill Author" type="text" id="author" value={author} onChange={handleAuthorChange} />
            <Styled.FileInput ref={imageRef} type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
            <Styled.CustomButton variant={!!image && !!imageUrl ? 'contained' : 'outlined'} onClick={() => imageRef?.current?.click()}>
              {!!image && !!imageUrl ? 'The photo is selected' : 'Select a photo'}
            </Styled.CustomButton>
            Preview photo:
            <img src={imageUrl} alt="Cover" />
            <Button variant="outlined" type="submit" disabled={isLoading || !!error.length}>
              {isLoading ? <Loader width={15} height={15} borderSize={2} /> : 'Submit'}
            </Button>
            {error}
          </>
        )}
      </Styled.AddOwnBookWrapper>
    </ModalComponent>
  );
};
