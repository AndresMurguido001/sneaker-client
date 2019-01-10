import React from "react";
import { Grid, Container } from "semantic-ui-react";
import {
  HeadingPrimary,
  Section,
  HeadingSecondary,
  ShoeTitle,
  LatestDisplay,
  BtnBasic,
  Content,
  Paragraph,
} from "../styles/Home/Home";
import bg from "../images/midSectionBg.jpg";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Section background={bg} height={"70rem"} left>
        <Container>

      <HeadingPrimary>Snkr Head Shop</HeadingPrimary>
          
        
          </Container>
        
        </Section>
        <Section midSection={"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F02%2Fnike-kobe-1-protro-behind-the-design-4.jpg?w=1600&cbr=1&q=90&fit=max"}>
              <HeadingSecondary underlined mb={6}>
                New realeases
              </HeadingSecondary>

          <Grid container stackable columns={5}>
                <Grid.Row>
                  <Grid.Column>
                    <LatestDisplay image="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/auqb8busmbrkkbl7r4b0/air-max-270-big-kids-shoe-xqTPRWZZ.jpg" first>
                      <ShoeTitle>
                        Nike Air Max 270 Big Kids' Shoe
                        </ShoeTitle> 
                    </LatestDisplay>
                  </Grid.Column>
                  <Grid.Column>
                    <LatestDisplay image="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ljx665gq3v2gkq9ejxyj/air-max-97-mens-shoe-YPTAGkX9.jpg" second>
                      <ShoeTitle>
                        Nike Air Max 97 Men's Shoe
                      </ShoeTitle>
                    </LatestDisplay>
                  </Grid.Column>
                
              <Grid.Column>
                    <LatestDisplay image="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/td9qnn9vvwthwu6c2v0l/metcon-dsx-flyknit-2-mens-cross-training-weightlifting-shoe-DkV1G8.jpg" third>
                      <ShoeTitle>
                        Nike Metcon DSX Flyknit 2
                      </ShoeTitle>
                    </LatestDisplay>
                  </Grid.Column>
            <Grid.Column> 
                    <LatestDisplay image="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ocot9t1sy8dq77fnbifn/zoom-strike-mens-running-shoe-ERTB3PyA.jpg" fourth>
                      <ShoeTitle>
                        Nike Zoom Strike Men's Running Shoe
                      </ShoeTitle>
                    </LatestDisplay>
                  </Grid.Column> 
              <Grid.Column>
                    <LatestDisplay image="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oxzyuok820ego8fxbtqt/air-zoom-mariah-flyknit-racer-womens-shoe-w8ToVNqv.jpg" fifth>
                      <ShoeTitle>
                        Air Zoom Mariah Flyknit Racer
                      </ShoeTitle>
                    </LatestDisplay>
                  </Grid.Column>
            </Grid.Row>
          </Grid>

          <Container>
              <BtnBasic className="basicBtn--secondary">
                more snkrs &#10095;
              </BtnBasic>
          </Container>

          <Grid columns={2} container>
              <Grid.Row>
                <Grid.Column>
                <Content bordered>
                  <HeadingSecondary bordered>
                    For SNKRHDS BY SNKRHDS
                  </HeadingSecondary>
                </Content>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle">
                  <Paragraph>
                    Try-hard whatever tbh brooklyn squid hoodie disrupt cloud bread jean shorts la croix tattooed coloring book vegan blue bottle. Fingerstache twee disrupt meggings. Chicharrones la croix street art ugh, chartreuse pug brunch banh mi kombucha wolf pickled cloud bread adaptogen. Shoreditch squid normcore selfies austin distillery poutine letterpress iPhone wolf flexitarian messenger bag. Unicorn venmo master cleanse, mumblecore hoodie poke 3 wolf moon shoreditch meh cliche craft beer adaptogen PBR&B. Before they sold out chicharrones 8-bit readymade helvetica lo-fi aesthetic messenger bag vegan seitan church-key bespoke williamsburg migas.

    Oh. You need a little dummy text for your mockup? How quaint.
                  </Paragraph>
        </Grid.Column>
            </Grid.Row>
          </Grid>
        </Section>
        </div>
    );
  }
}

export default Home;
