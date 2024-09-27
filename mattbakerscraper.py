import os
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup

root_url = "https://www.mattbakercomedy.com/"
category_ = ""
categories = ['jugglers', 'magicians', 'comedians', 'variety']
url = f"https://www.mattbakercomedy.com/{category_}.html"

def get_all_links(url):
    print(url)
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        links = soup.find_all('a')
        link_sources = [link.get('href') for link in links if link.get('href')]
        return link_sources
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return []

def extract_individual_content(input_list, category):
    all_content = []
    artist = {"name": "",
              "byline": "",
              "category": "",
              "description": "",
              "image": "",
              "alt-text": "",}

    # Loop over all the links
    for input in input_list:
        new_url = root_url + input
        try:
            # Fetch the content of each URL
            response = requests.get(str(new_url))

            # If the request is successful
            if response.status_code == 200:
                # Parse the HTML content of the page
                soup = BeautifulSoup(response.content, 'html.parser')
                # Find the <div> element with id="individual"
                individual_div = soup.find('div', class_='individual')

                if individual_div:
                    
                    # Remove <img> tags within the div
                    for img_tag in individual_div.find_all('img'):
                        img_src = img_tag['src']
                        parsed_url = urlparse(img_src)
                        artist["name"] = img_tag['title']
                        artist["image"] = os.path.basename(parsed_url.path)
                        artist["category"] = category
                        img_tag.decompose()  # Removes the <img> tag
                        for br in individual_div.find_all(text=True):
                            if '\n' in br:
                                br.replace_with(br.replace('\n', '<br>'))
                        artist["description"] = str(individual_div)

                    # Append the remaining HTML content of the div to the list
                    with open("output.csv", "a") as file:
                        file.write(f"{artist['name']},{artist['category']},{artist['image']},\"{artist['description']}\"\n")
                    all_content.append(str(individual_div))

            else:
                print(f"Failed to retrieve {input}. Status code: {response.status_code}")
        
        except Exception as e:
            print(f"An error occurred while processing {input}: {e}")

    return all_content

for category in categories:
    all_links = get_all_links(root_url + category + ".html")
    artist_pages = list(set([link for link in all_links if "/" in link]))
    content_from_individuals = extract_individual_content(artist_pages, category)

# print (content_from_individuals)

# # Print or process the extracted content
# for content in content_from_individuals:
#     print(content)