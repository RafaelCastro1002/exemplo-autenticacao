const blockedImagePath = "/src/assets/blocked.png";

const renderBlocked = (container: HTMLElement) => {
  const htmlContent = `
    <div id="blocked-container">
      <img id="blocked-image" src="${blockedImagePath}" />
      <h1>Acesso bloqueado</h1>
    </div>
  `;

  container.innerHTML = htmlContent;
};

export default renderBlocked;
