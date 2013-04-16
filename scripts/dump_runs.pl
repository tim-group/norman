#!/usr/bin/env perl
use  strict;
use warnings;
use lib '/opt/message-passing/lib/perl5/';
use JSON qw/ encode_json to_json /;
use Data::GUID;

use ElasticSearch;

my $es = ElasticSearch->new( servers => 'localhost:9200' );
#$es->trace_calls(1); 
my $results = $es->search(
  index => 'logstash-2013.03.29',
  type  => 'puppet-apply',
  "from" => 0, "size" => 1000,
  query => {
        "term" => { '@tags' => "puppet-apply" }
  }
);
use Data::Dumper;

#warn Dumper($results);

my @data = @{ $results->{hits}{hits} };

mkdir("test_data") if ! -d "test_data";
system("rm -r test_data/*");
foreach my $datum (@data) {
    open(my $fh, '>', "test_data/" . $datum->{'_id'} . ".json") or die;
    print $fh to_json($datum, {utf8 => 1, pretty => 1}) . "\n";
    close($fh);
}
open(my $fh, '>', "test_data/reports_latest.json") or die;
print $fh to_json($results, {utf8 => 1, pretty => 1}) . "\n";
close($fh);


