import { Book } from '@/types/Book';

interface PortalProps {
  onClose: () => void;
}

interface BookModalPortalProps extends PortalProps {
  onUserClick: () => void;
  book: Book;
}

interface TargetUserPortalProps extends PortalProps {
  targetUserId: number | string;
}

declare module '@/components/modals/AddCity/AddCity_Portal' {
  import React from 'react';
  export const AddCityPortal: React.FC<PortalProps>;
}

declare module '@/components/modals/AddBookForm/AddBookForm_Portal' {
  import React from 'react';
  export const AddBookFormPortal: React.FC<PortalProps>;
}

declare module '@/components/modals/BookModal/BookModalPortal' {
  import React from 'react';
  export const BookModalPortal: React.FC<BookModalPortalProps>;
}

declare module '@/components/modals/TargetUser/TargetUser_Portal' {
  import React from 'react';
  export const TargetUserPortal: React.FC<TargetUserPortalProps>;
}

declare module '@/components/modals/Terms/TermsPortal' {
  import React from 'react';
  export const TermsPortal: React.FC<TermsPortalProps>;
}

declare module '@/components/modals/Verif/Verif_Portal' {
  import React from 'react';
  export const Verif_Portal: React.FC<PortalProps>;
}

declare module '@/components/modals/SuccessModal/SuccessModal' {
  import React from 'react';
  export const SuccessModal: React.FC<SuccessModalProps>;
}
