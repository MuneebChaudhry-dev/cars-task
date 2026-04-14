import { createFileRoute } from '@tanstack/react-router';
import { ValidatedForm } from '../components/form/ValidatedForm';

export const Route = createFileRoute('/')({
  component: ValidatedForm,
});
