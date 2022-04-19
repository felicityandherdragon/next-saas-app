import { supabase } from '../utils/supabase';
import Link from "next/link";
import { useUser } from '../context/user';

const Home = ({ lessons }) => {
  const {user} = useUser();
  console.log(user);
  return (
    <div>
      <h2>Hiiiiiiii</h2>
      <div>
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/${lesson.id}`}>
            <a>{lesson.title}</a>
          </Link>
        ))}
      </div>
    </div>
  )
};

export const getStaticProps = async () => {
  const {data: lessons} = await supabase.from('lesson').select('*')

  return {
    props: {
      lessons,
    }
  }
}

export default Home;
