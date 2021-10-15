import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIES = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  width: 50%;
`;

const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 25px;
`;
const Poster = styled.div`
  width: 30%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "👍" : "👎"}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
