export type TRepeatRefetchUsers = ({
  page,
  title,
  userId,
  createdAt
}: {
  page?: number;
  title?: string;
  userId?: string;
  createdAt?: 'asc' | 'desc';
}) => void;