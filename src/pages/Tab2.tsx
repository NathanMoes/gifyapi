import {
  InfiniteScrollCustomEvent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

interface gifyData {
  type: string;
  id: string;
  url: string;
  images: {
    downsized: { url: string };
  };
  slug: string;
  title: string;
}

const Tab2: React.FC = () => {
  const apiKey = "o7q9v0bHGGByZelzeVDbEtbAOsCULGAj";
  const [data, setData] = useState(Array<gifyData>);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`;

  const getData = useCallback(() => {
    fetch(URL, {})
      .then((res) => {
        if (!res.ok) {
          throw new Error("error reading data from thing" + `${res.status}`);
        }
        return res.json();
      })
      .then((content) => {
        console.log(content.data);
        setData(content.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [URL]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {data.map((item) => (
              <IonCol sizeLg="3" sizeMd="4" sizeSm="6" sizeXs="12">
                <img src={item.images.downsized.url} alt={item.title}></img>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={(event: InfiniteScrollCustomEvent) => {
            setLimit((prev) => {
              return prev + 10;
            });
            event.target.complete();
          }}
        >
          <IonInfiniteScrollContent
            loadingSpinner={"bubbles"}
            loadingText={"loading more gifs"}
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
