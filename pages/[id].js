import { supabase } from '../utils/supabase';
import { useState, useEffect } from 'react';
import Video from 'react-player';

const LessonDetails = ({ lesson }) => {
  const [videoUrl, setVideoUrl] = useState();

  console.log({ lesson });
  const getPremiumContent = async () => {
    const { data } = await supabase
      .from('premium_content')
      .select('video_url')
      .eq('id', lesson.id)
      .single();

      setVideoUrl(data?.video_url);
  };

  useEffect(() => {
    getPremiumContent()
  }, []);

  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      {!!videoUrl && <Video url={videoUrl} width="100%" />}
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from('lesson').select('id');

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: lesson } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single();

  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetails;
