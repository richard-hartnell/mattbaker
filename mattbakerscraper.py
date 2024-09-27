import requests
from bs4 import BeautifulSoup

# Function to get all the links from a page
def get_all_links(url):
    # Send a GET request to the website
    response = requests.get(url)

    # If the response status code is 200 (OK)
    if response.status_code == 200:
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all the <a> tags (which define hyperlinks)
        links = soup.find_all('a')

        # Extract the 'href' attribute from each link
        link_sources = [link.get('href') for link in links if link.get('href')]

        return link_sources
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return []

# Example usage
root_url = "https://www.mattbakercomedy.com/"
url = "https://www.mattbakercomedy.com/jugglers.html"
all_links = get_all_links(url)

# Function to visit all URLs and extract contents of <div> with id="individual"
def extract_individual_content(input_list):
    all_content = []

    # Loop over all the links
    for url in input_list:
        try:
            # Fetch the content of each URL
            response = requests.get((root_url + url))

            # If the request is successful
            if response.status_code == 200:
                # Parse the HTML content of the page
                soup = BeautifulSoup(response.content, 'html.parser')

                # Find the <div> element with id="individual"
                individual_div = soup.find('div', id='individual')
                print(individual_div)

                if individual_div:
                    # Remove <img> tags within the div
                    for img_tag in individual_div.find_all('img'):
                        img_tag.decompose()  # Removes the <img> tag

                    # Append the remaining HTML content of the div to the list
                    all_content.append(str(individual_div))

            else:
                print(f"Failed to retrieve {url}. Status code: {response.status_code}")
        
        except Exception as e:
            print(f"An error occurred while processing {url}: {e}")

    return all_content

get_all_links(url)
new_all_links = [link for link in all_links if "/" in link]
print (new_all_links)

content_from_individual = extract_individual_content(new_all_links)

# Print or process the extracted content
for content in content_from_individual:
    print(content)