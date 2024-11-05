import { Md5 } from "ts-md5";
import { explorePage, exploreURL } from "../../ui-manager/dragos/pages/pages";

describe("Test ExplorePage", () => {

  beforeEach(() => {
    cy.visit(exploreURL);
  });


  const values = [
    { name: "Chinatown", desc: "chinaDescription", img: "chinaImg", hash: "be56e5042589c937792a769279d87feb" },
    { name: "Haight & Ashbury", desc: "ashburyDescription", img: "ashburyImg", hash: "b2a7e467bf57d011ab9c8cf409690b43" },
    { name: "Golden Gate Bridge", desc: "goldenGateDescription", img: "goldenGateImg", hash: "b15ba44b79286ca9d181f1c65643cc3a" }
  ];

  //Check description is different from the template desc
  values.forEach((element) => {
    it(`Test ${element.name} description`, () => {
      const templateDesc = explorePage.templateDescription;

      explorePage[element.desc]()
        .should('be.visible')
        .invoke('text')
        .then((descText) => {
          expect(descText.trim()).to.not.equal(templateDesc.trim(), `${element.name} description should not be the same as the template description`);
        });
    });
  });

  // Test for each value: Verify the image using MD5 hash
  values.forEach((element) => {
    it(`Test ${element.name} image MD5 hash`, () => {
      explorePage[element.img]()
        .should('be.visible')
        .invoke('attr', 'src')
        .then((imageLink) => {
          if (imageLink) {
            cy.log(imageLink)
            cy.request(imageLink).then((res) => {
              expect(Md5.hashStr(JSON.stringify(res.body))).to.eq(element.hash, `${element.name} image hash should match`);
            });
          } else {
            throw new Error('Image link is undefined');
          }
        });
    });
  });

  it("Get Image from background", () => {
        const url = "https://static.wixstatic.com/media/3030f0cdb8854cee84ee31fc9598f5df.jpg/v1/fill/w_1478,h_1149,al_t,q_85,usm_0.66_1.00_0.01,enc_auto/3030f0cdb8854cee84ee31fc9598f5df.jpg"
        const image = "fbfe0c4b1c7ab9cf725f9f23e4e481b4"
        cy.request(url).then((res) => {
        expect(Md5.hashStr(JSON.stringify(res.body))).to.eq(image);
    })
  })

  it("Welcome description is not a template text", () => {
    explorePage.welcomeParagraph().should('not.contain', explorePage.templateWelcome);
  })

});
