# Norman

[![Build Status](https://travis-ci.org/youdevise/norman.png)](https://travis-ci.org/youdevise/norman)

Norman is a (very) small subset of [Foreman](http://theforeman.org/), just
for viewing puppet run reports.

## Getting reports

See [Puppet logstash reporter](https://github.com/youdevise/puppet-logstash-reporter/)

for the report you need to add to puppet.

## Munging reports

You are expected to have a rule like this in your logstash config:

    mutate {
        tags       => [ "puppet-apply" ]
        replace    => [ "@type", "puppet-apply" ]
    }

# Hosting norman

It's 100% Javascript, so just copy the app/ directory under your web root
somewhere.

It by default expects Elasticsearch to be available at /es/ on the same server
you installed it on.

You can, alternatively, install norman as an Elasticsearch plugin.

Just build a .zip file of the 

# Screenshots

![Overview](overview.png)

![Details](detail.png)

# Developing

You'll need node.js, but you should be able to easily run the development server:

    spaceinvaders norman [master]$ ./scripts/web-server.js
    Http Server running at http://localhost:8000/

# TO`DO

  * Add an 'other runs for this host' page
  * Fix search / ordering functionality on homepage
