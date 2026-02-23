export default {
  generatePicture: async (subject: string): Promise<string> => {
    return new Promise((resolve, _reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', `/${subject.toLowerCase()}.png`);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
};
