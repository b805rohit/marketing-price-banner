import { computed } from "vue";
import useStore from "../store";

export const useTranspiler = () => {
  const { plans, defaultStyles } = useStore();

  const html = computed(() => {
    return `
        <div style="display: flex; justify-content: center; padding-top: 2.5rem; padding-bottom: 2.5rem;">
          <div class="plan-grid">
            ${plans.value
              .map((plan) => {
                return `
                <div style="padding: 1.5rem; text-align: center; border-radius: 0.5rem; border: 1px solid ${
                  defaultStyles.value.borderColor
                }; color: ${defaultStyles.value.textColor}; ${
                  plan.mostPopular
                    ? `border: 2px solid ${defaultStyles.value.mostPopularBorderColor}; background-color: ${defaultStyles.value.mostPopularBgColor};`
                    : ""
                }">
                  ${
                    plan.mostPopular
                      ? `<div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: ${defaultStyles.value.mostPopularLabelColor};font-family: '${defaultStyles.value.headlineFont}', sans-serif;">Most popular</div>`
                      : ""
                  }
                  <h2 style="margin-bottom: 1rem; font-size: ${
                    defaultStyles.value.headlineFontSize
                  }; font-weight: ${
                  defaultStyles.value.headlineWeight
                }; font-family: '${
                  defaultStyles.value.headlineFont
                }', sans-serif;">${plan.name}</h2>
                  <p style="margin-bottom: 0.25rem; font-size: ${
                    defaultStyles.value.headlineFontSize
                  }; font-weight: ${
                  defaultStyles.value.headlineWeight
                }; font-family: '${
                  defaultStyles.value.headlineFont
                }', sans-serif;">${plan.price}</p>
                  <p style="margin-bottom: 1.5rem; font-size: ${
                    defaultStyles.value.contentFontSize
                  }; color: ${
                  defaultStyles.value.annualPriceColor
                }; font-weight: ${
                  defaultStyles.value.contentWeight
                }; font-family: '${
                  defaultStyles.value.contentFont
                }', sans-serif;">${plan.annualPrice}</p>
                  <button style="border:none;padding: 0.5rem 1rem; margin-bottom: 1.5rem; color: white; border-radius: 0.25rem; background-color: ${
                    plan.mostPopular
                      ? defaultStyles.value.mostPopularButtonBgColor
                      : defaultStyles.value.buttonBgColor
                  }; font-size: ${
                  defaultStyles.value.contentFontSize
                }; font-weight: ${
                  defaultStyles.value.headlineWeight
                }; font-family: '${
                  defaultStyles.value.headlineFont
                }', sans-serif;cursor:pointer">
                    ${plan.buttonText}
                  </button>
                  <ul style="text-align: left;padding:0px; display: flex; flex-direction: column; list-style: none; gap: 0.5rem; font-size: ${
                    defaultStyles.value.contentFontSize
                  }; font-weight: ${
                  defaultStyles.value.contentWeight
                }; font-family: '${
                  defaultStyles.value.contentFont
                }', sans-serif;">
                    ${plan.features
                      .map(
                        (feature) => `
                      <li style="display: flex; align-items: center;">
                        <span style="margin-right: 0.5rem;">${
                          feature.available ? "✔️" : "❌"
                        }</span>
                        <span  style="${
                          feature.available
                            ? ""
                            : `color: ${defaultStyles.value.featureUnavailableColor}; text-decoration: line-through;`
                        }">${feature.text}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
  });

  const css = computed(
    () => `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${defaultStyles.value.headlineFont}:wght@${defaultStyles.value.headlineWeight}&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=${defaultStyles.value.contentFont}:wght@${defaultStyles.value.contentWeight}&display=swap');
    
    .plan-grid {
      display: grid;
      width: 100%;
      max-width: 56rem;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 1.25rem;
    }
    
    .--mobile .plan-grid{
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    
    @media (min-width: 768px) {
      .plan-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    </style>
    `
  );

  const htmlPreview = computed(() => {
    return `
      ${html.value}
      ${css.value}
    `;
  });

  const js = computed(() => {
    return `
        function openLink(url) {
          window.open(url, '_blank');
        }

        document.querySelectorAll('.plan-grid button').forEach((button, index) => {
          button.addEventListener('click', () => {
            const plans = ${JSON.stringify(
              plans.value.map((plan) => ({ buttonAction: plan.buttonAction }))
            )};
              const plan = plans[index];
              if (plan && plan.buttonAction) {
                openLink(plan.buttonAction);
              }
          });
        });
    `;
  });

  return { htmlPreview, js };
};
