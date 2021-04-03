import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Boilerplate Free',
    // imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        No more writing extra boilerplate code. Just define your <code>ObservableProvider</code>
        and consume state from your application!
      </>
    ),
  },
  {
    title: 'Easy State Access',
    // imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Easily access your data and providers with simple hooks. You can also combine providers,
        and read them from anywhere
      </>
    ),
  },
  {
    title: 'Framework Independent',
    // imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        The core logic of this library does not depend on any frontend Javascript framework
        and can easily be used alone in NodeJs and extended to any new framework
      </>
    ),
  },
];

function Feature({title, description}) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {/* {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )} */}

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Easy, maintanable state management with providers and RxJS">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
