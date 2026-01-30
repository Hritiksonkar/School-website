import { useEffect } from 'react';
import Courses from '../components/Courses';

export default function CoursesPage() {
  useEffect(() => {
    document.title = 'Courses | Munner Ram Inter College';
  }, []);

  return (
    <main>
      <Courses />
    </main>
  );
}
